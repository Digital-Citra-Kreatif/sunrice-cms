import { j as e, t as s, f as S, a as B, r as j, b as Te, d as es, e as ss, l as P, c as ts, g as as, h as ls, s as ns, i as is, k as rs } from "./admin-CTp91Zu-.js";
import { c as U, _ as N } from "./createLucideIcon-Ccbp7F45.js";
import { u as a } from "./ui-Dh5wfMwT.js";
import { u as cs } from "./Confirm-NU5VTStc.js";
import { S as os, w as ds, T as ms } from "./SlugNote-DUGKvyIo.js";
import { E as ve, C as Z } from "./EntryStatus-CuqDakpd.js";
import { E as us } from "./EntriesPicker-CwmT5FHU.js";
import { C as Ae } from "./check-OeKFYRnl.js";
import { S as hs, M as ps, U as re } from "./undo-2-CBzqSKK6.js";
import { F as xs } from "./FieldSections-DRmha8J_.js";
import { C as gs, z as Be, A as fs, b as bs, h as vs, B as js, T as ws } from "./FieldInput-DhEYwzJg.js";
import { s as ks } from "./seo-CkqTUtGk.js";
import { F } from "./FieldError-CT-sp68d.js";
import { R as Ns } from "./rotate-ccw-BcgdCn0y.js";
import { T as je } from "./trash-DHN6ewjn.js";
import { L as Cs } from "./link-2-BYZeXgi5.js";
import { C as Me } from "./copy-BT7TBOUx.js";
import { L as Ss } from "./layout-template-RwJXNfEY.js";
import { L as _e } from "./loader-circle-ByksABXO.js";
import { E as ys } from "./external-link-CFxEu4M4.js";
import { P as Ds } from "./plus-COqahUZ2.js";
const Pe = {
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
Pe.node;
const ce = U(Pe);
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
const $s = U(Ee);
const Le = {
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
Le.node;
const Ts = U(Le);
const Fe = {
  name: "git-compare",
  size: 24,
  node: [
    ["circle", { cx: "18", cy: "18", r: "3", key: "1xkwt0" }],
    ["circle", { cx: "6", cy: "6", r: "3", key: "1lh9wr" }],
    ["path", { d: "M13 6h3a2 2 0 0 1 2 2v7", key: "1yeb86" }],
    ["path", { d: "M11 18H8a2 2 0 0 1-2-2V9", key: "19pyzm" }]
  ]
};
Fe.node;
const As = U(Fe);
const ze = {
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
ze.node;
const we = U(ze);
const Ie = {
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
Ie.node;
const Bs = U(Ie);
function ke(l) {
  return l.match(/\n|[^\s]+[^\S\n]*|[^\S\n]+/g) ?? [];
}
const Ms = 25e4;
function _s(l, r) {
  if (l === r) return l === "" ? [] : [{ text: l, op: "same" }];
  const c = ke(l), m = ke(r);
  if (c.length * m.length > Ms)
    return [...l ? [{ text: l, op: "removed" }] : [], ...r ? [{ text: r, op: "added" }] : []];
  const h = c.length + 1, t = m.length + 1, o = new Uint32Array(h * t);
  for (let x = c.length - 1; x >= 0; x--)
    for (let f = m.length - 1; f >= 0; f--)
      o[x * t + f] = c[x].trimEnd() === m[f].trimEnd() ? o[(x + 1) * t + f + 1] + 1 : Math.max(o[(x + 1) * t + f], o[x * t + f + 1]);
  const g = [], p = (x, f) => {
    const k = g[g.length - 1];
    k && k.op === f ? k.text += x : g.push({ text: x, op: f });
  };
  let i = 0, u = 0;
  for (; i < c.length && u < m.length; )
    c[i].trimEnd() === m[u].trimEnd() ? (p(m[u], "same"), i++, u++) : o[(i + 1) * t + u] >= o[i * t + u + 1] ? p(c[i++], "removed") : p(m[u++], "added");
  for (; i < c.length; ) p(c[i++], "removed");
  for (; u < m.length; ) p(m[u++], "added");
  return g;
}
function Ps(l, r) {
  return l.filter((c) => c.op === "same" || c.op === (r === "old" ? "removed" : "added"));
}
const Ne = { preserveScroll: !0, preserveState: !0 };
function Es({ entryId: l, comments: r }) {
  const [c, m] = N.useState(null), [h, t] = N.useState(""), [o, g] = N.useState(!1), p = (u, x) => j.router.post(B(`cms/comments/${u}/status`), { status: x }, Ne), i = (u) => j.router.post(B(`cms/comments/${u}/reply`), { body: h }, {
    ...Ne,
    onStart: () => g(!0),
    onFinish: () => g(!1),
    onSuccess: () => {
      m(null), t("");
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
        r.latest.map((u) => /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-1.5 cms:border-t cms:border-border/70 cms:pt-3 cms:first-of-type:border-t-0 cms:first-of-type:pt-0", children: [
          /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-2", children: [
            /* @__PURE__ */ e.jsx("span", { className: "cms:min-w-0 cms:flex-1 cms:truncate cms:font-medium", children: u.author }),
            u.status === "pending" && /* @__PURE__ */ e.jsx(a.Badge, { variant: "outline", children: s("Pending") })
          ] }),
          /* @__PURE__ */ e.jsx("p", { className: "cms:line-clamp-3 cms:break-words cms:whitespace-pre-line", children: u.excerpt }),
          /* @__PURE__ */ e.jsxs("div", { className: "cms:text-xs cms:text-muted-foreground", children: [
            S(u.createdAt),
            u.reply ? ` · ${s("a reply")}` : ""
          ] }),
          r.canModerate && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:gap-1", children: [
            u.status === "pending" && /* @__PURE__ */ e.jsxs(a.Button, { type: "button", variant: "outline", size: "sm", onClick: () => p(u.id, "approved"), children: [
              /* @__PURE__ */ e.jsx(Ae, {}),
              " ",
              s("Approve")
            ] }),
            /* @__PURE__ */ e.jsxs(a.Button, { type: "button", variant: "ghost", size: "sm", onClick: () => p(u.id, "spam"), children: [
              /* @__PURE__ */ e.jsx(hs, {}),
              " ",
              s("Spam")
            ] }),
            /* @__PURE__ */ e.jsxs(
              a.Button,
              {
                type: "button",
                variant: "ghost",
                size: "sm",
                "aria-expanded": c === u.id,
                onClick: () => {
                  m(c === u.id ? null : u.id), t("");
                },
                children: [
                  /* @__PURE__ */ e.jsx(ps, {}),
                  " ",
                  s("Reply")
                ]
              }
            )
          ] }),
          c === u.id && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
            /* @__PURE__ */ e.jsx(
              a.Textarea,
              {
                "aria-label": s("Reply to :author", { author: u.author }),
                rows: 3,
                value: h,
                onChange: (x) => t(x.target.value)
              }
            ),
            /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:gap-2", children: [
              /* @__PURE__ */ e.jsx(a.Button, { type: "button", size: "sm", disabled: h.trim() === "" || o, onClick: () => i(u.id), children: s("Post reply") }),
              /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "ghost", size: "sm", onClick: () => m(null), children: s("Cancel") })
            ] })
          ] })
        ] }, u.id)),
        /* @__PURE__ */ e.jsx("a", { href: B(`cms/comments?entry=${l}`), className: "cms:text-sm cms:font-medium cms:underline-offset-4 cms:hover:underline", children: s("All comments on this entry") })
      ] }) : /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(a.Skeleton, { className: "cms:h-10" }),
        /* @__PURE__ */ e.jsx(a.Skeleton, { className: "cms:h-10" })
      ] })
    }
  );
}
function Ls(l, r) {
  const c = new Set(l), m = new Set(r);
  return c.size === m.size && [...c].every((h) => m.has(h));
}
function Fs(l, r) {
  const c = {}, m = {};
  for (const [h, t] of Object.entries(r)) {
    const o = l[h] ?? [];
    Ls(o, t) || (c[h] = t.slice(), m[h] = o.slice());
  }
  return Object.keys(c).length === 0 ? null : { terms: c, terms_base: m };
}
function Ce(l) {
  if (l.length === 0) return "";
  const r = l.slice(0, 5).map((c) => c.label).join("; ");
  return ` ${l.length > 5 ? s("It's used by :list and :count more: those links will show nothing.", { list: r, count: l.length - 5 }) : s("It's used by :list: those links will show nothing.", { list: r })}`;
}
function vt(l) {
  const { entry: r } = l;
  return /* @__PURE__ */ e.jsx(zs, { ...l }, r ? `${r.id}:${r.locale}:${r.version}:${r.status}:${r.trashed}:${r.publishedAt}` : "new");
}
function zs({ collection: l, fields: r, locales: c = [], shared: m = [], sharedValues: h = {}, entry: t, values: o, revisions: g, comments: p, termLabels: i, usedBy: u = [], undoRestore: x = null, machineTranslate: f = null, machineTranslateMissing: k = !1, settings: A, taxonomies: b = [], blueprints: E = [], blueprintUrl: q = null, homepage: z, redirectsUrl: Oe = null, templates: Ve = null, templateChoices: Ue, can: w }) {
  const K = B(`cms/collections/${l.handle}/entries`), y = t ? B(`cms/entries/${t.id}`) : K, ee = t ? o.title : s("New entry");
  a.useBreadcrumbs([{ label: l.title, href: K }, { label: ee }]);
  const [I, qe] = cs(), [Ke, H] = N.useState(!1), se = t?.publishedAt ? Te(new Date(t.publishedAt)) : "", [oe, de] = N.useState(se);
  N.useEffect(() => de(se), [se]);
  const [R, me] = N.useState(null), [He, ue] = N.useState(!1), [Ye, he] = N.useState(!1), [We, te] = N.useState(!1), d = j.useForm({
    ...o,
    seo: o.seo ?? {},
    terms: Array.isArray(o.terms) || !o.terms ? {} : o.terms,
    locale: t?.locale ?? null,
    version: t?.version ?? null,
    publish: !1,
    published_at: null,
    parent_id: A?.parentId ?? null,
    template: A?.template ?? "",
    comments_closed: A?.commentsClosed === !0
  }), pe = (n) => d.setData((v) => ({ ...v, ...n })), O = t ? { locale: t.locale } : {}, M = c.find((n) => n.main)?.code, C = d.errors, G = j.usePage().props.errors ?? {}, V = (n) => {
    const v = js(C, n);
    v.length > 0 && d.clearErrors(...v);
  }, L = t !== null && t.status !== "draft" && !t.hasUnpublishedChanges && !d.isDirty, J = es(t?.status ?? "draft", oe, t?.publishedAt ?? null), xe = t === null ? w.create : w.update && !t.trashed, Y = t?.status === "scheduled", _ = t ? ss(t) : null, W = t?.live?.changed ?? [], ge = (n) => W.includes(n) ? /* @__PURE__ */ e.jsx(Z, {}) : null, Q = l.pages !== !1, Ge = Array.isArray(o.terms) || !o.terms ? {} : o.terms, ae = (n, v = !1) => {
    const { terms: T, ...fe } = n, ie = w.terms === !0 && b.length > 0 ? Fs(Ge, T) : null, be = ie === null ? fe : { ...fe, terms: ie.terms, ...v ? {} : { terms_base: ie.terms_base } };
    if (A || t === null) return be;
    const { parent_id: Gs, template: Js, comments_closed: Qs, ...Ze } = be;
    return Ze;
  }, le = Array.isArray(i) || !i ? {} : i, ne = (n = !1, v = null) => {
    d.transform((T) => ({ ...ae(T), publish: n, published_at: v })), t ? d.put(y, { preserveScroll: !0, onSuccess: () => H(!1) }) : d.post(y);
  }, Je = () => {
    d.transform((n) => ({ ...ae(n, !0), version: null, publish: !1, published_at: null })), d.put(y, { preserveScroll: !0 });
  }, $ = a.useEditLock({
    type: "cms.entry",
    id: t?.id,
    locale: t?.locale,
    enabled: t !== null && xe,
    noun: s("entry"),
    leaveTo: K,
    getUnsaved: () => d.isDirty ? { title: d.data.title, slug: d.data.slug, data: d.data.data, seo: d.data.seo, terms: d.data.terms } : null
  }), D = xe && !$.readOnly, Qe = async (n) => {
    const v = await $.loadKept(n);
    d.setData((T) => ({ ...T, title: v.title ?? T.title, slug: v.slug ?? T.slug, data: v.data ?? T.data, seo: v.seo ?? T.seo, terms: v.terms ?? T.terms }));
  };
  a.useUnsavedChanges(d.isDirty && !$.takenOver, D ? () => d.processing || ne() : void 0);
  const Xe = () => {
    const n = () => j.router.post(`${y}/review`, O, { preserveScroll: !0 });
    d.isDirty ? (d.transform((v) => ({ ...ae(v), publish: !1, published_at: null })), d.put(y, { preserveScroll: !0, onSuccess: n })) : n();
  }, X = (n = null) => {
    w.update ? ne(!0, n) : t && j.router.post(`${y}/publish`, { ...O, published_at: n }, { preserveScroll: !0, onSuccess: () => H(!1) });
  };
  return /* @__PURE__ */ e.jsxs("form", { noValidate: !0, onSubmit: (n) => {
    n.preventDefault(), ne();
  }, className: "cms:flex cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(j.Head, { title: ee }),
    qe,
    $.dialogs,
    /* @__PURE__ */ e.jsxs(
      a.PageHeader,
      {
        title: ee,
        back: { href: K, label: s("Back to :title", { title: l.title }) },
        actions: /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          t?.trashed && w.delete && /* @__PURE__ */ e.jsxs(a.Button, { type: "button", variant: "outline", onClick: () => j.router.post(`${y}/restore`, {}, { preserveScroll: !0 }), children: [
            /* @__PURE__ */ e.jsx(Ns, {}),
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
                s(`Permanently delete ":title" in every language, with its revisions? This can't be undone.`, { title: o.title }) + Ce(u),
                () => j.router.delete(`${y}/force`, { data: u.length > 0 ? { force: 1 } : {} })
              ),
              children: [
                /* @__PURE__ */ e.jsx(je, {}),
                " ",
                s("Permanently delete")
              ]
            }
          ),
          t && !t.trashed && (Q || w.create || w.delete && !$.readOnly || D && f !== null || q) && /* @__PURE__ */ e.jsxs(a.DropdownMenu, { children: [
            /* @__PURE__ */ e.jsx(a.DropdownMenuTrigger, { asChild: !0, children: /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "outline", size: "icon", "aria-label": s("More actions"), children: /* @__PURE__ */ e.jsx($s, {}) }) }),
            /* @__PURE__ */ e.jsxs(a.DropdownMenuContent, { align: "end", className: "cms:min-w-52", children: [
              D && f !== null && /* @__PURE__ */ e.jsxs(
                a.DropdownMenuItem,
                {
                  disabled: d.processing || d.isDirty,
                  title: d.isDirty ? void 0 : s("Fill in what isn't translated yet, into the draft"),
                  onSelect: () => j.router.post(B(`cms/entries/${t.id}/translations/${t.locale}/translate`), { version: t.version }, { preserveScroll: !0 }),
                  children: [
                    /* @__PURE__ */ e.jsx(we, {}),
                    " ",
                    d.isDirty ? s("Save to translate") : s("Translate from :language", { language: c.find((n) => n.main)?.name ?? (M ? P(M) : s("the main language")) })
                  ]
                }
              ),
              Q && /* @__PURE__ */ e.jsxs(a.DropdownMenuItem, { title: s("A link that shows the saved draft to anyone, without signing in, for a while"), onSelect: () => he(!0), children: [
                /* @__PURE__ */ e.jsx(Cs, {}),
                " ",
                s("Share preview link…")
              ] }),
              w.create && /* @__PURE__ */ e.jsxs(a.DropdownMenuItem, { title: s("Copy every language as a new draft"), onSelect: () => j.router.post(`${y}/duplicate`), children: [
                /* @__PURE__ */ e.jsx(Me, {}),
                " ",
                s("Duplicate")
              ] }),
              q && /* @__PURE__ */ e.jsx(a.DropdownMenuItem, { asChild: !0, children: /* @__PURE__ */ e.jsxs(j.Link, { href: q, children: [
                /* @__PURE__ */ e.jsx(Ss, {}),
                " ",
                s("Edit blueprint")
              ] }) }),
              w.delete && !$.readOnly && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
                /* @__PURE__ */ e.jsx(a.DropdownMenuSeparator, {}),
                /* @__PURE__ */ e.jsxs(
                  a.DropdownMenuItem,
                  {
                    className: "cms:text-destructive",
                    onSelect: () => I(s('Move ":title" to the trash? It comes off the site; you can restore it.', { title: o.title }) + Ce(u), () => j.router.delete(y), s("Move to trash")),
                    children: [
                      /* @__PURE__ */ e.jsx(je, {}),
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
              /* @__PURE__ */ e.jsx(we, {}),
              " ",
              s("Translate from :language", { language: c.find((n) => n.main)?.name ?? (M ? P(M) : s("the main language")) })
            ] }),
            /* @__PURE__ */ e.jsx("span", { id: "machine-translate-missing", className: "cms:sr-only", children: s("Machine translation isn't set up on this site: ask your developer.") })
          ] }),
          D && /* @__PURE__ */ e.jsxs(a.Button, { type: "submit", variant: t ? "outline" : "default", disabled: d.processing, children: [
            d.processing && /* @__PURE__ */ e.jsx(_e, { className: "cms:animate-spin" }),
            t ? s("Save draft") : s("Create draft")
          ] }),
          t && !t.trashed && D && !w.publish && (t.status === "draft" || t.hasUnpublishedChanges || d.isDirty) && /* @__PURE__ */ e.jsxs(
            a.Button,
            {
              type: "button",
              disabled: d.processing,
              onClick: Xe,
              title: t.review ? s("Already sent; sending again tells them again") : s("Ask those who can publish to review it"),
              children: [
                /* @__PURE__ */ e.jsx(Bs, {}),
                " ",
                t.review ? s("Send for review again") : s("Submit for review")
              ]
            }
          ),
          t && !t.trashed && w.publish && !$.readOnly && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex", children: [
            Y && L ? /* @__PURE__ */ e.jsxs(a.Button, { type: "button", variant: "outline", className: "cms:rounded-r-none", disabled: d.processing, title: s("Change the date"), onClick: () => H(!0), children: [
              /* @__PURE__ */ e.jsx(ce, {}),
              " ",
              s("Scheduled for :date", { date: S(t.publishedAt) })
            ] }) : /* @__PURE__ */ e.jsxs(a.Button, { type: "button", variant: L ? "outline" : "default", className: "cms:rounded-r-none cms:disabled:opacity-100", disabled: d.processing || L, onClick: () => X(J.at), children: [
              L && /* @__PURE__ */ e.jsx(Ae, { className: "cms:text-emerald-600 cms:dark:text-emerald-400" }),
              L ? s("Published") : J.action === "schedule" ? s("Schedule") : J.action === "backdate" ? s("Publish now, back-dated") : _ === "offline" ? s("Publish again") : t.status === "draft" ? s("Publish") : s("Publish changes")
            ] }),
            /* @__PURE__ */ e.jsxs(a.DropdownMenu, { children: [
              /* @__PURE__ */ e.jsx(a.DropdownMenuTrigger, { asChild: !0, children: /* @__PURE__ */ e.jsx(a.Button, { type: "button", size: "icon", variant: L ? "outline" : "default", className: L ? "cms:-ml-px cms:rounded-l-none" : "cms:rounded-l-none cms:border-l cms:border-primary-foreground/20", "aria-label": s("More publishing options"), children: /* @__PURE__ */ e.jsx(gs, {}) }) }),
              /* @__PURE__ */ e.jsxs(a.DropdownMenuContent, { align: "end", children: [
                /* @__PURE__ */ e.jsxs(a.DropdownMenuItem, { onSelect: () => H(!0), children: [
                  /* @__PURE__ */ e.jsx(ce, {}),
                  " ",
                  Y ? s("Change the date…") : s("Publish on a date…")
                ] }),
                Y && /* @__PURE__ */ e.jsx(a.DropdownMenuItem, { onSelect: () => X((/* @__PURE__ */ new Date()).toISOString()), children: s("Publish now") }),
                t.status !== "draft" && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
                  /* @__PURE__ */ e.jsx(a.DropdownMenuSeparator, {}),
                  /* @__PURE__ */ e.jsx(a.DropdownMenuItem, { onSelect: () => j.router.post(`${y}/unpublish`, O, { preserveScroll: !0 }), children: Y ? s("Unschedule (back to draft)") : s("Unpublish") })
                ] })
              ] })
            ] })
          ] })
        ] }),
        children: [
          t && (t.trashed ? /* @__PURE__ */ e.jsx(a.Badge, { variant: "secondary", children: s("In the trash") }) : /* @__PURE__ */ e.jsx(ve, { status: t.status, changes: t.status !== "draft" && t.hasUnpublishedChanges })),
          t?.review && !t.trashed && /* @__PURE__ */ e.jsx(a.Badge, { variant: "warning", title: t.review.by ? s(":name sent it on :date", { name: t.review.by, date: S(t.review.requestedAt) }) : s("Sent on :date", { date: S(t.review.requestedAt) }), children: s("Waiting for review") })
        ]
      }
    ),
    t && _ && /* @__PURE__ */ e.jsx(
      Hs,
      {
        state: _,
        entry: t,
        dirty: d.isDirty,
        actions: ts(_, { liveUrl: t.url !== null, pages: Q, canUpdate: D }),
        onCompare: () => ue(!0),
        onDiscard: () => I(
          s(`Discard the unpublished changes to ":title"? The editor goes back to the live version, as visitors see it. This can't be undone.`, { title: o.title }) + (d.isDirty ? ` ${s("Your unsaved edits are lost too.")}` : ""),
          () => j.router.post(B(`cms/entries/${t.id}/translations/${t.locale}/discard`), { version: t.version }, { preserveScroll: !0 }),
          s("Discard changes")
        )
      }
    ),
    t && c.length > 1 && /* @__PURE__ */ e.jsx(
      Rs,
      {
        entryUrl: y,
        editUrl: `${K}/${t.id}/edit`,
        current: t.locale,
        locales: c,
        canAdd: (w.create || w.translate === !0) && !t.trashed,
        canRemove: w.delete && !t.isMain && !t.trashed,
        onRemove: () => I(
          s('Remove the :language translation of ":title"? Its revisions go with it.', { language: P(t.locale), title: o.title }),
          () => j.router.delete(`${y}/translations/${t.locale}`)
        )
      }
    ),
    /* @__PURE__ */ e.jsx(a.ViewingNotice, { by: $.viewingBy, onTakeOver: $.requestTakeOver }),
    /* @__PURE__ */ e.jsx(a.KeptEditsNotice, { kept: $.kept, disabled: !D, onLoad: (n) => {
      Qe(n);
    }, onDiscard: (n) => {
      $.discardKept(n);
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
            disabled: d.processing,
            onClick: () => I(s("Save your version over theirs? Their changes are replaced (their earlier published versions stay in the revisions)."), Je),
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
              ge("title")
            ] }),
            /* @__PURE__ */ e.jsx(
              a.Input,
              {
                id: "title",
                value: d.data.title,
                "aria-invalid": C.title !== void 0,
                onChange: (n) => {
                  const v = n.target.value;
                  d.setData((T) => ({ ...T, title: v, slug: as(T.slug, T.title, v, t !== null && t.publishedAt === null && t.status === "draft") })), V("title");
                }
              }
            ),
            /* @__PURE__ */ e.jsx(F, { message: C.title })
          ] }),
          /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
            /* @__PURE__ */ e.jsxs(a.Label, { htmlFor: "slug", children: [
              s("Slug"),
              ge("slug")
            ] }),
            /* @__PURE__ */ e.jsx(
              a.Input,
              {
                id: "slug",
                className: "cms:font-mono",
                value: d.data.slug,
                placeholder: s("Made from the title"),
                "aria-invalid": C.slug !== void 0,
                onChange: (n) => {
                  d.setData("slug", n.target.value), V("slug");
                }
              }
            ),
            /* @__PURE__ */ e.jsx(os, { note: ls(t?.publishedSlug, d.data.slug, t !== null && t.status !== "draft"), redirectsUrl: Oe }),
            /* @__PURE__ */ e.jsx(F, { message: C.slug })
          ] })
        ] }) }) }),
        /* @__PURE__ */ e.jsx(Be.Provider, { value: le, children: /* @__PURE__ */ e.jsx(
          xs,
          {
            disabled: !D,
            fields: r,
            values: d.data.data,
            errors: C,
            storageKey: `cms:entry:${l.handle}`,
            shared: m,
            sharedValues: h,
            changed: W,
            sharedNote: M ? s("Shared by all languages: the greyed-out fields are edited in :language.", { language: P(M) }) : s("Shared by all languages: the greyed-out fields are edited in the main language."),
            onChange: (n, v) => {
              d.setData("data", { ...d.data.data, [n]: v }), V(`data.${n}`);
            }
          }
        ) }),
        /* @__PURE__ */ e.jsx(a.CollapsibleCard, { title: W.some((n) => n.startsWith("seo.")) ? /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          s("SEO"),
          /* @__PURE__ */ e.jsx(Z, {})
        ] }) : s("SEO"), description: s("How this entry appears in search results and shared links."), titleClassName: "cms:text-base", storageKey: "cms:entry:seo", hasErrors: vs(C, "seo"), children: /* @__PURE__ */ e.jsx("fieldset", { disabled: !D, className: "cms:min-w-0", children: /* @__PURE__ */ e.jsx(
          fs,
          {
            bare: !0,
            id: "seo",
            fields: ks(),
            value: d.data.seo,
            errors: bs(C, "seo"),
            onChange: (n) => {
              d.setData("seo", n), V("seo");
            }
          }
        ) }) })
      ] }),
      !t && (l.hierarchical || b.length > 0) && /* @__PURE__ */ e.jsxs("aside", { className: "cms:flex cms:min-w-0 cms:flex-col cms:gap-4", children: [
        l.hierarchical && /* @__PURE__ */ e.jsx(a.CollapsibleCard, { title: "Page settings", titleClassName: "cms:text-base", storageKey: "cms:entry:page-settings", hasErrors: C.parent_id !== void 0, children: /* @__PURE__ */ e.jsx("fieldset", { disabled: !D, className: "cms:flex cms:min-w-0 cms:flex-col cms:gap-4 cms:text-sm", children: /* @__PURE__ */ e.jsx(Re, { collection: l, value: d.data.parent_id, error: C.parent_id, onChange: (n) => pe({ parent_id: n }) }) }) }),
        /* @__PURE__ */ e.jsx(
          $e,
          {
            taxonomies: b,
            value: d.data.terms,
            labels: le,
            errors: C,
            changed: W,
            disabled: !D || w.terms !== !0,
            onChange: (n, v) => {
              d.setData("terms", { ...d.data.terms, [n]: v }), V(`terms.${n}`);
            }
          }
        )
      ] }),
      t && /* @__PURE__ */ e.jsxs("aside", { className: "cms:flex cms:min-w-0 cms:flex-col cms:gap-4", children: [
        /* @__PURE__ */ e.jsxs(a.CollapsibleCard, { title: s("Status"), titleClassName: "cms:text-base", storageKey: "cms:entry:status", contentClassName: "cms:flex cms:flex-col cms:gap-3 cms:text-sm", children: [
          /* @__PURE__ */ e.jsxs("dl", { className: "cms:flex cms:flex-col cms:gap-2", children: [
            /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:justify-between cms:gap-3", children: [
              /* @__PURE__ */ e.jsx("dt", { className: "cms:text-muted-foreground", children: s("Status") }),
              /* @__PURE__ */ e.jsx("dd", { className: "cms:flex cms:flex-wrap cms:justify-end cms:gap-1", children: t.trashed ? /* @__PURE__ */ e.jsx(a.Badge, { variant: "secondary", children: s("In the trash") }) : /* @__PURE__ */ e.jsx(ve, { status: t.status, changes: t.status !== "draft" && t.hasUnpublishedChanges }) })
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
          t.review && !t.trashed && (t.review.mine || w.publish && !$.readOnly) && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:gap-2", children: [
            w.publish && !$.readOnly && /* @__PURE__ */ e.jsxs(a.Button, { type: "button", variant: "outline", size: "sm", disabled: d.processing, onClick: () => te(!0), children: [
              /* @__PURE__ */ e.jsx(re, {}),
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
                onClick: () => j.router.post(`${y}/review/withdraw`, O, { preserveScroll: !0 }),
                children: s("Withdraw the request")
              }
            )
          ] }),
          !t.trashed && w.publish && !$.readOnly && /* @__PURE__ */ e.jsx(
            Os,
            {
              status: t.status,
              value: oe,
              onChange: de,
              dated: J,
              processing: d.processing,
              onPublish: (n) => X(n),
              onUnpublish: () => j.router.post(`${y}/unpublish`, O, { preserveScroll: !0 })
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
                (z.current ? s('Make ":title" the homepage? Visitors to / will see it instead of ":current".', { title: o.title, current: z.current }) : s('Make ":title" the homepage? Visitors to / will see it.', { title: o.title })) + " " + s("Its own address will lead to / as well."),
                () => j.router.post(`${y}/homepage`, {}, { preserveScroll: !0 }),
                s("Make this the homepage")
              ),
              children: s("Make this the homepage")
            }
          ),
          c.find((n) => n.code === t.locale)?.outdated && /* @__PURE__ */ e.jsx("p", { className: "cms:text-amber-700 cms:dark:text-amber-400", children: M ? s("The :language version changed since this translation was last saved.", { language: P(M) }) : s("The main version changed since this translation was last saved.") })
        ] }),
        /* @__PURE__ */ e.jsxs(a.CollapsibleCard, { title: s("Used by"), titleClassName: "cms:text-base", storageKey: "cms:entry:used-by", contentClassName: "cms:flex cms:flex-col cms:gap-1 cms:text-sm", children: [
          u.length === 0 && /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: s("No other content links here.") }),
          u.map((n) => /* @__PURE__ */ e.jsxs("div", { className: "cms:min-w-0", children: [
            n.url ? /* @__PURE__ */ e.jsx("a", { href: n.url, className: "cms:block cms:truncate cms:underline-offset-4 cms:hover:underline", children: n.label }) : /* @__PURE__ */ e.jsx("span", { className: "cms:block cms:truncate", children: n.label }),
            /* @__PURE__ */ e.jsx("span", { className: "cms:text-xs cms:text-muted-foreground", title: n.field, children: n.fieldLabel ?? n.field })
          ] }, `${n.label}:${n.field}`))
        ] }),
        A && /* @__PURE__ */ e.jsx(
          Ws,
          {
            entryUrl: y,
            collection: l,
            settings: A,
            templates: ds(Ve, Ue),
            blueprints: E,
            disabled: !D,
            values: d.data,
            errors: C,
            onChange: pe,
            draftDirty: d.isDirty,
            commentCount: p ? p.counts.pending + p.counts.approved : null
          }
        ),
        /* @__PURE__ */ e.jsx(
          $e,
          {
            taxonomies: b,
            value: d.data.terms,
            labels: le,
            errors: C,
            changed: W,
            disabled: !D || w.terms !== !0,
            onChange: (n, v) => {
              d.setData("terms", { ...d.data.terms, [n]: v }), V(`terms.${n}`);
            }
          }
        ),
        p !== null && l.comments && /* @__PURE__ */ e.jsx(Es, { entryId: t.id, comments: p }),
        /* @__PURE__ */ e.jsxs(a.CollapsibleCard, { title: s("Revisions"), titleClassName: "cms:text-base", storageKey: "cms:entry:revisions", contentClassName: "cms:flex cms:flex-col cms:gap-2 cms:text-sm", children: [
          x !== null && w.update && /* @__PURE__ */ e.jsxs(a.Button, { type: "button", variant: "outline", size: "sm", onClick: () => j.router.post(B(`cms/entries/${t.id}/translations/${t.locale}/undo-restore`), {}, { preserveScroll: !0 }), children: [
            /* @__PURE__ */ e.jsx(re, {}),
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
                /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "ghost", size: "sm", onClick: () => me(n), children: s("Compare") }),
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
      Is,
      {
        open: We,
        onClose: () => te(!1),
        by: t.review.by,
        onSend: (n, v) => j.router.post(`${y}/review/send-back`, { ...O, note: n }, { preserveScroll: !0, onSuccess: () => {
          te(!1), v();
        }, onError: v })
      }
    ),
    t && _ && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
      /* @__PURE__ */ e.jsx(
        De,
        {
          open: He,
          onClose: () => ue(!1),
          dirty: d.isDirty,
          url: B(`cms/entries/${t.id}/translations/${t.locale}/compare-live`),
          read: (n) => ({ label: String(n.label), old: String(n.live ?? ""), new: String(n.draft ?? "") }),
          title: s("Your changes compared with the live version"),
          description: s("What visitors see, beside your saved changes. Removed words are struck through, added ones highlighted."),
          oldLabel: Us(t.live),
          newLabel: s("Your changes (not published)"),
          same: s("Your changes are the same as the live version.")
        }
      ),
      /* @__PURE__ */ e.jsx(
        De,
        {
          open: R !== null,
          onClose: () => me(null),
          dirty: d.isDirty,
          url: R ? B(`cms/entries/${t.id}/revisions/${R.id}/compare`) : null,
          read: (n) => ({ label: String(n.label), old: String(n.revision ?? ""), new: String(n.draft ?? "") }),
          title: s("Version of :date compared with :current", { date: S(R?.createdAt), current: Se(_) }),
          description: s("A version published earlier, beside :current. Removed words are struck through, added ones highlighted.", { current: Se(_) }),
          oldLabel: R ? qs(R) : "",
          newLabel: Ks(_),
          same: s("The two versions are the same.")
        }
      ),
      Q && /* @__PURE__ */ e.jsx(Ys, { open: Ye, onClose: () => he(!1), url: t.previewUrl, expiresAt: t.previewExpiresAt ?? null })
    ] }),
    /* @__PURE__ */ e.jsx(
      Vs,
      {
        open: Ke,
        onClose: () => H(!1),
        processing: d.processing,
        rescheduling: Y,
        current: t?.publishedAt ?? null,
        onSchedule: (n) => X(n)
      }
    )
  ] });
}
function Is({ open: l, onClose: r, by: c, onSend: m }) {
  const [h, t] = N.useState(""), [o, g] = N.useState(!1), p = j.usePage().props.errors ?? {};
  return N.useEffect(() => {
    l && t("");
  }, [l]), /* @__PURE__ */ e.jsx(a.Dialog, { open: l, onOpenChange: (i) => !i && !o && r(), children: /* @__PURE__ */ e.jsxs(a.DialogContent, { children: [
    /* @__PURE__ */ e.jsxs(a.DialogHeader, { children: [
      /* @__PURE__ */ e.jsx(a.DialogTitle, { children: s("Send back without publishing") }),
      /* @__PURE__ */ e.jsx(a.DialogDescription, { children: c ? s(":name gets an email with your note, and the request is cleared. The draft stays as it is.", { name: c }) : s("The one who asked gets an email with your note, and the request is cleared. The draft stays as it is.") })
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
          "aria-invalid": p.note !== void 0,
          onChange: (i) => t(i.target.value)
        }
      ),
      /* @__PURE__ */ e.jsx(F, { message: p.note })
    ] }),
    /* @__PURE__ */ e.jsxs(a.DialogFooter, { children: [
      /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "outline", disabled: o, onClick: r, children: s("Cancel") }),
      /* @__PURE__ */ e.jsxs(a.Button, { type: "button", disabled: o, onClick: () => {
        g(!0), m(h, () => g(!1));
      }, children: [
        o && /* @__PURE__ */ e.jsx(_e, { className: "cms:animate-spin" }),
        " ",
        s("Send back")
      ] })
    ] })
  ] }) });
}
function Rs({ entryUrl: l, editUrl: r, current: c, locales: m, canAdd: h, canRemove: t, onRemove: o }) {
  const g = m.filter((i) => i.status !== null), p = m.filter((i) => i.status === null);
  return /* @__PURE__ */ e.jsxs("nav", { "aria-label": s("Languages"), className: "cms:flex cms:flex-wrap cms:items-center cms:gap-2", children: [
    /* @__PURE__ */ e.jsx("div", { className: "cms:inline-flex cms:items-center cms:gap-0.5 cms:rounded-md cms:bg-muted cms:p-0.5", children: g.map((i) => {
      const u = i.code === c, x = i.main ? s(":language (main)", { language: i.name ?? P(i.code) }) : i.name ?? P(i.code), f = i.status ? ns(i.status) : "", k = i.outdated ? s(":language: :status, outdated (the main language changed since)", { language: x, status: f }) : s(":language: :status", { language: x, status: f });
      return /* @__PURE__ */ e.jsxs(
        "button",
        {
          type: "button",
          title: k,
          "aria-label": k,
          "aria-current": u ? "page" : void 0,
          onClick: () => !u && j.router.get(r, { locale: i.code }),
          className: `cms:relative cms:inline-flex cms:h-7 cms:min-w-10 cms:items-center cms:justify-center cms:gap-1.5 cms:rounded cms:px-2.5 cms:text-xs cms:font-semibold cms:tracking-wide cms:uppercase cms:transition-colors ${u ? "cms:bg-card cms:text-foreground cms:shadow-xs" : "cms:text-muted-foreground cms:hover:text-foreground"}`,
          children: [
            i.code,
            (i.outdated || i.status === "published") && /* @__PURE__ */ e.jsx("span", { "aria-hidden": !0, className: `cms:size-1.5 cms:rounded-full ${i.outdated ? "cms:bg-amber-500" : "cms:bg-emerald-500"}` })
          ]
        },
        i.code
      );
    }) }),
    h && p.map((i) => /* @__PURE__ */ e.jsxs(
      a.Button,
      {
        type: "button",
        variant: "outline",
        size: "sm",
        className: "cms:h-8 cms:border-dashed cms:text-xs cms:uppercase",
        title: s("Add :language", { language: i.name ?? P(i.code) }),
        onClick: () => j.router.post(`${l}/translations`, { locale: i.code }),
        children: [
          /* @__PURE__ */ e.jsx(Ds, {}),
          " ",
          i.code
        ]
      },
      i.code
    )),
    t && /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "ghost", size: "sm", className: "cms:ml-auto cms:text-destructive", onClick: o, children: s("Remove this language") })
  ] });
}
function Os({ status: l, value: r, onChange: c, dated: m, processing: h, onPublish: t, onUnpublish: o }) {
  const g = m.action !== "now", p = {
    now: s("Publish"),
    schedule: l === "scheduled" ? s("Reschedule") : s("Schedule"),
    backdate: s("Publish now, back-dated"),
    redate: s("Change date")
  }[m.action];
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2 cms:border-t cms:border-border/60 cms:pt-3", children: [
    /* @__PURE__ */ e.jsx(a.Label, { htmlFor: "entry-published-at", children: s("Publish date") }),
    /* @__PURE__ */ e.jsx(a.DatePicker, { id: "entry-published-at", withTime: !0, className: "cms:max-w-none", value: r || null, onChange: (i) => c(i ?? "") }),
    /* @__PURE__ */ e.jsx("p", { className: "cms:text-xs cms:text-muted-foreground", children: l === "draft" ? s("Empty: now. A date in the future schedules it.") : s("The date shown as published. A date in the future takes it off the site until then.") }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:gap-2", children: [
      (l === "draft" || g) && /* @__PURE__ */ e.jsxs(a.Button, { type: "button", size: "sm", disabled: h, onClick: () => t(m.at), children: [
        /* @__PURE__ */ e.jsx(ce, {}),
        " ",
        p
      ] }),
      l !== "draft" && /* @__PURE__ */ e.jsx(a.Button, { type: "button", size: "sm", variant: "outline", disabled: h, onClick: o, children: s("Unpublish") })
    ] })
  ] });
}
function Vs({ open: l, onClose: r, onSchedule: c, current: m, processing: h, rescheduling: t }) {
  const [o, g] = N.useState("");
  N.useEffect(() => {
    l && g(Te(is(m)));
  }, [l, m]);
  const p = o === "" ? null : new Date(o), i = p !== null && p.getTime() <= Date.now();
  return /* @__PURE__ */ e.jsx(a.Dialog, { open: l, onOpenChange: (u) => !u && r(), children: /* @__PURE__ */ e.jsxs(a.DialogContent, { children: [
    /* @__PURE__ */ e.jsxs(a.DialogHeader, { children: [
      /* @__PURE__ */ e.jsx(a.DialogTitle, { children: t ? s("Change the publish date") : s("Publish on a date") }),
      /* @__PURE__ */ e.jsx(a.DialogDescription, { children: s("The entry goes live then.") })
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
      /* @__PURE__ */ e.jsx(a.Label, { htmlFor: "published-at", children: s("Date and time") }),
      /* @__PURE__ */ e.jsx(a.DatePicker, { id: "published-at", withTime: !0, required: !0, className: "cms:max-w-none", value: o || null, onChange: (u) => g(u ?? "") }),
      /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: s("In your time zone.") }),
      i && /* @__PURE__ */ e.jsx("p", { role: "alert", className: "cms:text-sm cms:text-amber-700 cms:dark:text-amber-400", children: s("This date has passed: the entry goes live now, dated :date.", { date: S(p.toISOString()) }) })
    ] }),
    /* @__PURE__ */ e.jsxs(a.DialogFooter, { children: [
      /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "outline", onClick: r, children: s("Cancel") }),
      /* @__PURE__ */ e.jsx(a.Button, { type: "button", disabled: p === null || h, onClick: () => p && c(p.toISOString()), children: i ? s("Publish now, back-dated") : t ? s("Change the date") : s("Schedule") })
    ] })
  ] }) });
}
function Us(l) {
  return l?.publishedAt ? l.by ? s("Live (published :date by :name)", { date: S(l.publishedAt), name: l.by }) : s("Live (published :date)", { date: S(l.publishedAt) }) : s("Live");
}
function qs(l) {
  return l.author ? s("Version of :date by :name", { date: S(l.createdAt), name: l.author }) : s("Version of :date", { date: S(l.createdAt) });
}
function Ks(l) {
  return l === "live" ? s("Live") : l === "scheduled" ? s("Published (scheduled)") : l === "draft" || l === "trashed" ? s("Draft (not published)") : s("Your changes (not published)");
}
function Se(l) {
  return l === "live" ? s("the live version") : l === "scheduled" ? s("the scheduled version") : l === "draft" || l === "trashed" ? s("the draft") : s("your changes");
}
function Hs({ state: l, entry: r, dirty: c, actions: m, onCompare: h, onDiscard: t }) {
  const o = r.live, g = o?.publishedAt ? o.by ? s("the version published on :date by :name", { date: S(o.publishedAt), name: o.by }) : s("the version published on :date", { date: S(o.publishedAt) }) : s("the version last published"), p = {
    draft: { title: s("Not published yet"), text: s("Only people who can edit see it."), tone: "muted" },
    offline: { title: s("Taken off the site"), text: s("Only people who can edit see it."), tone: "muted" },
    scheduled: { title: s("Scheduled"), text: s("Goes live on :date.", { date: S(r.publishedAt) }), tone: "scheduled" },
    "scheduled-changes": { title: s("Scheduled, with unpublished changes"), text: s("Goes live on :date with :version; your changes since aren't in it.", { date: S(r.publishedAt), version: g }), tone: "pending" },
    live: { title: s("Live"), text: c ? s("Visitors see what was last published.") : s("Visitors see exactly this."), tone: "live" },
    "live-changes": { title: s("Live, with unpublished changes"), text: s("Visitors still see :version.", { version: g }), tone: "pending" },
    trashed: { title: s("In the trash"), text: s("It's off the site. Restore it to edit it again."), tone: "trash" }
  }, { title: i, text: u, tone: x } = p[l], f = { muted: "cms:bg-muted-foreground/50", live: "cms:bg-emerald-500", pending: "cms:bg-amber-500", scheduled: "cms:bg-sky-500", trash: "cms:bg-destructive" }[x], k = x === "pending" ? "cms:border-amber-500/40 cms:bg-amber-500/5" : x === "live" ? "cms:border-emerald-500/30 cms:bg-emerald-500/5" : "cms:border-border cms:bg-card", A = rs(l);
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
            /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: u }),
            c && /* @__PURE__ */ e.jsx("p", { className: "cms:text-amber-700 cms:dark:text-amber-400", children: s("You have unsaved edits.") })
          ] })
        ] }),
        (m.viewLive || m.compare || m.preview || m.discard) && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:gap-2 cms:md:justify-end", children: [
          m.viewLive && r.url && /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "outline", size: "sm", asChild: !0, children: /* @__PURE__ */ e.jsxs("a", { href: r.url, target: "_blank", rel: "noopener noreferrer", children: [
            /* @__PURE__ */ e.jsx(ys, {}),
            " ",
            s("View live page")
          ] }) }),
          m.compare && /* @__PURE__ */ e.jsxs(a.Button, { type: "button", variant: "outline", size: "sm", onClick: h, children: [
            /* @__PURE__ */ e.jsx(As, {}),
            " ",
            s("Compare with live")
          ] }),
          m.preview && /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "outline", size: "sm", asChild: !0, children: /* @__PURE__ */ e.jsxs(
            "a",
            {
              href: r.previewUrl,
              target: "_blank",
              rel: "noopener noreferrer",
              title: c ? s("Shows what's saved: save first to see your unsaved edits.") : s("Shows what's saved, as visitors would see it once published."),
              children: [
                /* @__PURE__ */ e.jsx(Ts, {}),
                " ",
                A ? s("Preview changes") : s("Preview")
              ]
            }
          ) }),
          m.discard && /* @__PURE__ */ e.jsxs(a.Button, { type: "button", variant: "ghost", size: "sm", className: "cms:text-destructive", onClick: t, children: [
            /* @__PURE__ */ e.jsx(re, {}),
            " ",
            s("Discard changes")
          ] })
        ] })
      ]
    }
  );
}
function ye({ old: l, next: r, side: c }) {
  if ((c === "old" ? l : r).trim() === "") return /* @__PURE__ */ e.jsx("span", { className: "cms:text-muted-foreground cms:italic", children: s("(empty)") });
  const h = Ps(_s(l, r), c);
  return /* @__PURE__ */ e.jsx(e.Fragment, { children: h.map((t, o) => t.op === "same" ? /* @__PURE__ */ e.jsx(N.Fragment, { children: t.text }, o) : t.op === "removed" ? /* @__PURE__ */ e.jsx("del", { className: "cms:rounded-sm cms:bg-red-500/15 cms:text-red-900 cms:decoration-red-500/60 cms:dark:text-red-200", children: t.text }, o) : /* @__PURE__ */ e.jsx("ins", { className: "cms:rounded-sm cms:bg-emerald-500/20 cms:text-emerald-900 cms:no-underline cms:dark:text-emerald-200", children: t.text }, o)) });
}
function De({ open: l, url: r, read: c, title: m, description: h, oldLabel: t, newLabel: o, same: g, onClose: p, dirty: i }) {
  const [u, x] = N.useState(null), [f, k] = N.useState(!1), A = N.useRef(c);
  return A.current = c, N.useEffect(() => {
    if (x(null), k(!1), !l || !r) return;
    let b = !0;
    return fetch(r, { headers: { Accept: "application/json" }, credentials: "same-origin" }).then((E) => E.ok ? E.json() : Promise.reject(new Error(String(E.status)))).then((E) => {
      b && x(E.fields.map((q) => A.current(q)));
    }).catch(() => {
      b && k(!0);
    }), () => {
      b = !1;
    };
  }, [l, r]), /* @__PURE__ */ e.jsx(a.Dialog, { open: l, onOpenChange: (b) => !b && p(), children: /* @__PURE__ */ e.jsxs(a.DialogContent, { className: "cms:max-h-[85vh] cms:overflow-y-auto cms:sm:max-w-3xl", children: [
    /* @__PURE__ */ e.jsxs(a.DialogHeader, { children: [
      /* @__PURE__ */ e.jsx(a.DialogTitle, { children: m }),
      /* @__PURE__ */ e.jsxs(a.DialogDescription, { children: [
        h,
        i ? ` ${s("Your unsaved edits aren't included.")}` : ""
      ] })
    ] }),
    f && /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-destructive", children: s("The comparison could not be loaded. Try again.") }),
    !f && u === null && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
      /* @__PURE__ */ e.jsx(a.Skeleton, { className: "cms:h-12" }),
      /* @__PURE__ */ e.jsx(a.Skeleton, { className: "cms:h-12" })
    ] }),
    u?.length === 0 && /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: g }),
    u && u.length > 0 && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-4 cms:text-sm", children: [
      /* @__PURE__ */ e.jsxs("div", { "aria-hidden": !0, className: "cms:hidden cms:gap-2 cms:text-xs cms:font-medium cms:text-muted-foreground cms:sm:grid cms:sm:grid-cols-2", children: [
        /* @__PURE__ */ e.jsx("span", { children: t }),
        /* @__PURE__ */ e.jsx("span", { children: o })
      ] }),
      /* @__PURE__ */ e.jsx("dl", { className: "cms:flex cms:flex-col cms:gap-4", children: u.map((b) => /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-1", children: [
        /* @__PURE__ */ e.jsx("dt", { className: "cms:font-medium", children: b.label }),
        /* @__PURE__ */ e.jsxs("dd", { className: "cms:grid cms:gap-2 cms:sm:grid-cols-2", children: [
          /* @__PURE__ */ e.jsxs("div", { className: "cms:rounded-md cms:border cms:bg-muted/30 cms:p-2 cms:break-words cms:whitespace-pre-wrap", children: [
            /* @__PURE__ */ e.jsx("span", { className: "cms:block cms:text-xs cms:text-muted-foreground cms:sm:sr-only", children: t }),
            /* @__PURE__ */ e.jsx(ye, { old: b.old, next: b.new, side: "old" })
          ] }),
          /* @__PURE__ */ e.jsxs("div", { className: "cms:rounded-md cms:border cms:bg-muted/30 cms:p-2 cms:break-words cms:whitespace-pre-wrap", children: [
            /* @__PURE__ */ e.jsx("span", { className: "cms:block cms:text-xs cms:text-muted-foreground cms:sm:sr-only", children: o }),
            /* @__PURE__ */ e.jsx(ye, { old: b.old, next: b.new, side: "new" })
          ] })
        ] })
      ] }, b.label)) })
    ] }),
    /* @__PURE__ */ e.jsx(a.DialogFooter, { children: /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "outline", onClick: p, children: s("Close") }) })
  ] }) });
}
function Ys({ open: l, onClose: r, url: c, expiresAt: m }) {
  const h = () => {
    navigator.clipboard?.writeText(c).then(() => a.toast.success(s("Link copied.")), () => a.toast.error(s("Couldn't copy: select the link and copy it.")));
  };
  return /* @__PURE__ */ e.jsx(a.Dialog, { open: l, onOpenChange: (t) => !t && r(), children: /* @__PURE__ */ e.jsxs(a.DialogContent, { children: [
    /* @__PURE__ */ e.jsxs(a.DialogHeader, { children: [
      /* @__PURE__ */ e.jsx(a.DialogTitle, { children: s("Share preview link") }),
      /* @__PURE__ */ e.jsx(a.DialogDescription, { children: s("Anyone with this link sees what's saved, as the page would look published, without signing in. Visitors of the site don't see it.") })
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
      /* @__PURE__ */ e.jsx(a.Label, { htmlFor: "preview-link", children: s("Preview link") }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(a.Input, { id: "preview-link", readOnly: !0, value: c, className: "cms:font-mono cms:text-xs", onFocus: (t) => t.target.select() }),
        /* @__PURE__ */ e.jsxs(a.Button, { type: "button", variant: "outline", onClick: h, children: [
          /* @__PURE__ */ e.jsx(Me, {}),
          " ",
          s("Copy")
        ] })
      ] }),
      /* @__PURE__ */ e.jsxs("p", { className: "cms:text-sm cms:text-muted-foreground", children: [
        m ? s("It stops working at :time. Reload the editor for a new one.", { time: S(m) }) : s("It stops working after a while. Reload the editor for a new one."),
        " ",
        s("It shows changes saved after you share it too.")
      ] })
    ] }),
    /* @__PURE__ */ e.jsx(a.DialogFooter, { children: /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "outline", onClick: r, children: s("Close") }) })
  ] }) });
}
function Re({ collection: l, value: r, error: c, onChange: m }) {
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:min-w-0 cms:flex-col cms:gap-2", children: [
    /* @__PURE__ */ e.jsx(a.Label, { htmlFor: "parent", children: s("Parent") }),
    /* @__PURE__ */ e.jsx(
      us,
      {
        id: "parent",
        multiple: !1,
        max: 1,
        collections: [l.handle],
        invalid: c !== void 0,
        value: r,
        onChange: (h) => m(typeof h == "number" ? h : null)
      }
    ),
    /* @__PURE__ */ e.jsx(F, { message: c })
  ] });
}
function Ws({ entryUrl: l, collection: r, settings: c, templates: m, blueprints: h, disabled: t, values: o, errors: g, onChange: p, draftDirty: i, commentCount: u = null }) {
  const x = h.length > 1 ? c.blueprint ?? h[0].handle : void 0, f = j.useForm({ blueprint: x ?? "" }), k = f.errors.blueprint, A = ["parent_id", "template", "comments_closed"].some((b) => g[b] !== void 0) || k !== void 0;
  return /* @__PURE__ */ e.jsx(a.CollapsibleCard, { title: s("Page settings"), titleClassName: "cms:text-base", storageKey: "cms:entry:page-settings", hasErrors: A, children: /* @__PURE__ */ e.jsxs("fieldset", { disabled: t, className: "cms:flex cms:min-w-0 cms:flex-col cms:gap-4 cms:text-sm", children: [
    r.hierarchical && /* @__PURE__ */ e.jsx(Re, { collection: r, value: o.parent_id, error: g.parent_id, onChange: (b) => p({ parent_id: b }) }),
    h.length > 1 && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
      /* @__PURE__ */ e.jsx(a.Label, { htmlFor: "blueprint", children: s("Blueprint") }),
      /* @__PURE__ */ e.jsxs(a.Select, { value: f.data.blueprint, onValueChange: (b) => f.setData("blueprint", b), children: [
        /* @__PURE__ */ e.jsx(a.SelectTrigger, { id: "blueprint", className: "cms:w-full cms:min-w-0", "aria-invalid": k !== void 0, children: /* @__PURE__ */ e.jsx(a.SelectValue, {}) }),
        /* @__PURE__ */ e.jsx(a.SelectContent, { children: h.map((b) => /* @__PURE__ */ e.jsx(a.SelectItem, { value: b.handle, children: b.title }, b.handle)) })
      ] }),
      f.data.blueprint !== x && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
        /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: s("The fields change in every language. Values of fields the new blueprint doesn't have stay saved and come back if you switch back. The editor reloads.") }),
        /* @__PURE__ */ e.jsx(
          a.Button,
          {
            type: "button",
            size: "sm",
            className: "cms:w-fit",
            disabled: f.processing || i,
            "aria-describedby": i ? "blueprint-save-first" : void 0,
            onClick: () => f.put(`${l}/settings`, { preserveScroll: !0 }),
            children: s("Change blueprint")
          }
        ),
        i && /* @__PURE__ */ e.jsx("p", { id: "blueprint-save-first", className: "cms:text-xs cms:text-amber-700 cms:dark:text-amber-400", children: s("Save your draft first.") })
      ] }),
      /* @__PURE__ */ e.jsx(F, { message: k })
    ] }),
    /* @__PURE__ */ e.jsx(
      ms,
      {
        id: "template",
        value: o.template,
        onChange: (b) => p({ template: b }),
        lookup: m,
        example: `cms.${r.handle}-landing`,
        automatic: s("Automatic uses the collection's template."),
        error: g.template,
        disabled: t
      }
    ),
    r.comments && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-1 cms:border-t cms:border-border/60 cms:pt-4", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:justify-between cms:gap-3", children: [
        /* @__PURE__ */ e.jsx(a.Label, { htmlFor: "comments-open", className: "cms:whitespace-nowrap", children: s("Accept new comments") }),
        /* @__PURE__ */ e.jsx(a.Switch, { id: "comments-open", checked: !o.comments_closed, onCheckedChange: (b) => p({ comments_closed: !b }) })
      ] }),
      /* @__PURE__ */ e.jsx("a", { href: B(`cms/comments?entry=${l.split("/").slice(-1)[0]}`), className: "cms:w-fit cms:text-xs cms:text-muted-foreground cms:underline-offset-4 cms:hover:text-foreground cms:hover:underline", children: u === null ? s("View comments") : s("View comments (:count)", { count: u }) })
    ] })
  ] }) });
}
function $e({ taxonomies: l, value: r, labels: c, errors: m, changed: h, disabled: t, onChange: o }) {
  if (l.length === 0) return null;
  const g = h.some((i) => i.startsWith("terms.")), p = m.terms !== void 0 || l.some((i) => m[`terms.${i.handle}`] !== void 0);
  return /* @__PURE__ */ e.jsx(a.CollapsibleCard, { title: g ? /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    s("Taxonomies"),
    /* @__PURE__ */ e.jsx(Z, {})
  ] }) : s("Taxonomies"), titleClassName: "cms:text-base", storageKey: "cms:entry:taxonomies", hasErrors: p, children: /* @__PURE__ */ e.jsx(Be.Provider, { value: c, children: /* @__PURE__ */ e.jsxs("fieldset", { disabled: t, className: "cms:flex cms:min-w-0 cms:flex-col cms:gap-4 cms:text-sm", children: [
    l.map((i) => {
      const u = `terms-${i.handle}`, x = r[i.handle] ?? [], f = m[`terms.${i.handle}`];
      return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:min-w-0 cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsxs(a.Label, { htmlFor: u, children: [
          i.title,
          h.includes(`terms.${i.handle}`) && /* @__PURE__ */ e.jsx(Z, {})
        ] }),
        /* @__PURE__ */ e.jsx(
          ws,
          {
            id: u,
            taxonomy: i.handle,
            multiple: !i.single,
            max: null,
            required: !1,
            invalid: f !== void 0,
            value: i.single ? x[0] ?? null : x,
            onChange: (k) => o(i.handle, k === null ? [] : Array.isArray(k) ? k : [k])
          }
        ),
        i.single && /* @__PURE__ */ e.jsx("p", { className: "cms:text-xs cms:text-muted-foreground", children: s("One term only.") }),
        /* @__PURE__ */ e.jsx(F, { message: f })
      ] }, i.handle);
    }),
    /* @__PURE__ */ e.jsx(F, { message: m.terms })
  ] }) }) });
}
export {
  vt as default
};
