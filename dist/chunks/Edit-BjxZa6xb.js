import { j as e, t as s, f as S, a as B, r as j, b as Te, d as es, e as ss, l as V, c as ts, g as as, h as ls, i as is, k as ns, s as rs } from "./admin-IqhaZhDI.js";
import { c as U, _ as k } from "./createLucideIcon-Ccbp7F45.js";
import { u as a } from "./ui-Dh5wfMwT.js";
import { u as cs, T as ve } from "./Confirm-De_EGn8J.js";
import { s as os, w as ds, T as ms } from "./seo-DH5B7s4H.js";
import { E as je, C as Z } from "./EntryStatus-B9Rew89u.js";
import { E as us } from "./EntriesPicker-CbWzJ6n7.js";
import { C as Ae } from "./check-OeKFYRnl.js";
import { S as hs, M as ps, U as re } from "./undo-2-CBzqSKK6.js";
import { F as xs, e as gs } from "./languages-C-YEmcc7.js";
import { S as fs } from "./SlugNote-C8tDIV-f.js";
import { C as bs, z as Be, A as vs, b as js, h as ws, B as ks, T as Ns } from "./FieldInput-DG2Oxx0T.js";
import { F as P } from "./FieldError-BHWx1Jkq.js";
import { R as Cs } from "./rotate-ccw-BcgdCn0y.js";
import { L as Ss } from "./link-2-BYZeXgi5.js";
import { C as Me } from "./copy-BT7TBOUx.js";
import { L as ys } from "./layout-template-RwJXNfEY.js";
import { L as _e } from "./loader-circle-ByksABXO.js";
import { E as Ds } from "./external-link-CFxEu4M4.js";
const Le = {
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
Le.node;
const ce = U(Le);
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
const Ts = U(Pe);
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
function _s(l, n) {
  if (l === n) return l === "" ? [] : [{ text: l, op: "same" }];
  const r = ke(l), d = ke(n);
  if (r.length * d.length > Ms)
    return [...l ? [{ text: l, op: "removed" }] : [], ...n ? [{ text: n, op: "added" }] : []];
  const h = r.length + 1, t = d.length + 1, c = new Uint32Array(h * t);
  for (let f = r.length - 1; f >= 0; f--)
    for (let b = d.length - 1; b >= 0; b--)
      c[f * t + b] = r[f].trimEnd() === d[b].trimEnd() ? c[(f + 1) * t + b + 1] + 1 : Math.max(c[(f + 1) * t + b], c[f * t + b + 1]);
  const x = [], p = (f, b) => {
    const N = x[x.length - 1];
    N && N.op === b ? N.text += f : x.push({ text: f, op: b });
  };
  let u = 0, m = 0;
  for (; u < r.length && m < d.length; )
    r[u].trimEnd() === d[m].trimEnd() ? (p(d[m], "same"), u++, m++) : c[(u + 1) * t + m] >= c[u * t + m + 1] ? p(r[u++], "removed") : p(d[m++], "added");
  for (; u < r.length; ) p(r[u++], "removed");
  for (; m < d.length; ) p(d[m++], "added");
  return x;
}
function Ls(l, n) {
  return l.filter((r) => r.op === "same" || r.op === (n === "old" ? "removed" : "added"));
}
const Ne = { preserveScroll: !0, preserveState: !0 };
function Es({ entryId: l, comments: n }) {
  const [r, d] = k.useState(null), [h, t] = k.useState(""), [c, x] = k.useState(!1), p = (m, f) => j.router.post(B(`cms/comments/${m}/status`), { status: f }, Ne), u = (m) => j.router.post(B(`cms/comments/${m}/reply`), { body: h }, {
    ...Ne,
    onStart: () => x(!0),
    onFinish: () => x(!1),
    onSuccess: () => {
      d(null), t("");
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
        n.latest.map((m) => /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-1.5 cms:border-t cms:border-border/70 cms:pt-3 cms:first-of-type:border-t-0 cms:first-of-type:pt-0", children: [
          /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-2", children: [
            /* @__PURE__ */ e.jsx("span", { className: "cms:min-w-0 cms:flex-1 cms:truncate cms:font-medium", children: m.author }),
            m.status === "pending" && /* @__PURE__ */ e.jsx(a.Badge, { variant: "outline", children: s("Pending") })
          ] }),
          /* @__PURE__ */ e.jsx("p", { className: "cms:line-clamp-3 cms:break-words cms:whitespace-pre-line", children: m.excerpt }),
          /* @__PURE__ */ e.jsxs("div", { className: "cms:text-xs cms:text-muted-foreground", children: [
            S(m.createdAt),
            m.reply ? ` · ${s("a reply")}` : ""
          ] }),
          n.canModerate && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:gap-1", children: [
            m.status === "pending" && /* @__PURE__ */ e.jsxs(a.Button, { type: "button", variant: "outline", size: "sm", onClick: () => p(m.id, "approved"), children: [
              /* @__PURE__ */ e.jsx(Ae, {}),
              " ",
              s("Approve")
            ] }),
            /* @__PURE__ */ e.jsxs(a.Button, { type: "button", variant: "ghost", size: "sm", onClick: () => p(m.id, "spam"), children: [
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
                "aria-expanded": r === m.id,
                onClick: () => {
                  d(r === m.id ? null : m.id), t("");
                },
                children: [
                  /* @__PURE__ */ e.jsx(ps, {}),
                  " ",
                  s("Reply")
                ]
              }
            )
          ] }),
          r === m.id && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
            /* @__PURE__ */ e.jsx(
              a.Textarea,
              {
                "aria-label": s("Reply to :author", { author: m.author }),
                rows: 3,
                value: h,
                onChange: (f) => t(f.target.value)
              }
            ),
            /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:gap-2", children: [
              /* @__PURE__ */ e.jsx(a.Button, { type: "button", size: "sm", disabled: h.trim() === "" || c, onClick: () => u(m.id), children: s("Post reply") }),
              /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "ghost", size: "sm", onClick: () => d(null), children: s("Cancel") })
            ] })
          ] })
        ] }, m.id)),
        /* @__PURE__ */ e.jsx("a", { href: B(`cms/comments?entry=${l}`), className: "cms:text-sm cms:font-medium cms:underline-offset-4 cms:hover:underline", children: s("All comments on this entry") })
      ] }) : /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(a.Skeleton, { className: "cms:h-10" }),
        /* @__PURE__ */ e.jsx(a.Skeleton, { className: "cms:h-10" })
      ] })
    }
  );
}
function Ps(l, n) {
  const r = new Set(l), d = new Set(n);
  return r.size === d.size && [...r].every((h) => d.has(h));
}
function Fs(l, n) {
  const r = {}, d = {};
  for (const [h, t] of Object.entries(n)) {
    const c = l[h] ?? [];
    Ps(c, t) || (r[h] = t.slice(), d[h] = c.slice());
  }
  return Object.keys(r).length === 0 ? null : { terms: r, terms_base: d };
}
function Ce(l) {
  if (l.length === 0) return "";
  const n = l.slice(0, 5).map((r) => r.label).join("; ");
  return ` ${l.length > 5 ? s("It's used by :list and :count more: those links will show nothing.", { list: n, count: l.length - 5 }) : s("It's used by :list: those links will show nothing.", { list: n })}`;
}
function ft(l) {
  const { entry: n } = l;
  return /* @__PURE__ */ e.jsx(zs, { ...l }, n ? `${n.id}:${n.locale}:${n.version}:${n.status}:${n.trashed}:${n.publishedAt}` : "new");
}
function zs({ collection: l, fields: n, locales: r = [], shared: d = [], sharedValues: h = {}, entry: t, values: c, revisions: x, comments: p, termLabels: u, usedBy: m = [], undoRestore: f = null, machineTranslate: b = null, machineTranslateMissing: N = !1, settings: A, taxonomies: g = [], blueprints: L = [], blueprintUrl: q = null, homepage: F, redirectsUrl: Oe = null, templates: Ve = null, templateChoices: Ue, can: w }) {
  const K = B(`cms/collections/${l.handle}/entries`), y = t ? B(`cms/entries/${t.id}`) : K, ee = t ? c.title : s("New entry");
  a.useBreadcrumbs([{ label: l.title, href: K }, { label: ee }]);
  const [z, qe] = cs(), [Ke, H] = k.useState(!1), se = t?.publishedAt ? Te(new Date(t.publishedAt)) : "", [oe, de] = k.useState(se);
  k.useEffect(() => de(se), [se]);
  const [I, me] = k.useState(null), [He, ue] = k.useState(!1), [Ye, he] = k.useState(!1), [We, te] = k.useState(!1), o = j.useForm({
    ...c,
    seo: c.seo ?? {},
    terms: Array.isArray(c.terms) || !c.terms ? {} : c.terms,
    locale: t?.locale ?? null,
    version: t?.version ?? null,
    publish: !1,
    published_at: null,
    parent_id: A?.parentId ?? null,
    template: A?.template ?? "",
    comments_closed: A?.commentsClosed === !0
  }), pe = (i) => o.setData((v) => ({ ...v, ...i })), R = t ? { locale: t.locale } : {}, M = r.find((i) => i.main)?.code, C = o.errors, G = j.usePage().props.errors ?? {}, O = (i) => {
    const v = ks(C, i);
    v.length > 0 && o.clearErrors(...v);
  }, E = t !== null && t.status !== "draft" && !t.hasUnpublishedChanges && !o.isDirty, J = es(t?.status ?? "draft", oe, t?.publishedAt ?? null), xe = t === null ? w.create : w.update && !t.trashed, Y = t?.status === "scheduled", _ = t ? ss(t) : null, W = t?.live?.changed ?? [], ge = (i) => W.includes(i) ? /* @__PURE__ */ e.jsx(Z, {}) : null, Q = l.pages !== !1, Ge = Array.isArray(c.terms) || !c.terms ? {} : c.terms, ae = (i, v = !1) => {
    const { terms: T, ...fe } = i, ne = w.terms === !0 && g.length > 0 ? Fs(Ge, T) : null, be = ne === null ? fe : { ...fe, terms: ne.terms, ...v ? {} : { terms_base: ne.terms_base } };
    if (A || t === null) return be;
    const { parent_id: Gs, template: Js, comments_closed: Qs, ...Ze } = be;
    return Ze;
  }, le = Array.isArray(u) || !u ? {} : u, ie = (i = !1, v = null) => {
    o.transform((T) => ({ ...ae(T), publish: i, published_at: v })), t ? o.put(y, { preserveScroll: !0, onSuccess: () => H(!1) }) : o.post(y);
  }, Je = () => {
    o.transform((i) => ({ ...ae(i, !0), version: null, publish: !1, published_at: null })), o.put(y, { preserveScroll: !0 });
  }, $ = a.useEditLock({
    type: "cms.entry",
    id: t?.id,
    locale: t?.locale,
    enabled: t !== null && xe,
    noun: s("entry"),
    leaveTo: K,
    getUnsaved: () => o.isDirty ? { title: o.data.title, slug: o.data.slug, data: o.data.data, seo: o.data.seo, terms: o.data.terms } : null
  }), D = xe && !$.readOnly, Qe = async (i) => {
    const v = await $.loadKept(i);
    o.setData((T) => ({ ...T, title: v.title ?? T.title, slug: v.slug ?? T.slug, data: v.data ?? T.data, seo: v.seo ?? T.seo, terms: v.terms ?? T.terms }));
  };
  a.useUnsavedChanges(o.isDirty && !$.takenOver, D ? () => o.processing || ie() : void 0);
  const Xe = () => {
    const i = () => j.router.post(`${y}/review`, R, { preserveScroll: !0 });
    o.isDirty ? (o.transform((v) => ({ ...ae(v), publish: !1, published_at: null })), o.put(y, { preserveScroll: !0, onSuccess: i })) : i();
  }, X = (i = null) => {
    w.update ? ie(!0, i) : t && j.router.post(`${y}/publish`, { ...R, published_at: i }, { preserveScroll: !0, onSuccess: () => H(!1) });
  };
  return /* @__PURE__ */ e.jsxs("form", { noValidate: !0, onSubmit: (i) => {
    i.preventDefault(), ie();
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
            /* @__PURE__ */ e.jsx(Cs, {}),
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
                s(`Permanently delete ":title" in every language, with its revisions? This can't be undone.`, { title: c.title }) + Ce(m),
                () => j.router.delete(`${y}/force`, { data: m.length > 0 ? { force: 1 } : {} })
              ),
              children: [
                /* @__PURE__ */ e.jsx(ve, {}),
                " ",
                s("Permanently delete")
              ]
            }
          ),
          t && !t.trashed && (Q || w.create || w.delete && !$.readOnly || D && b !== null || q) && /* @__PURE__ */ e.jsxs(a.DropdownMenu, { children: [
            /* @__PURE__ */ e.jsx(a.DropdownMenuTrigger, { asChild: !0, children: /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "outline", size: "icon", "aria-label": s("More actions"), children: /* @__PURE__ */ e.jsx($s, {}) }) }),
            /* @__PURE__ */ e.jsxs(a.DropdownMenuContent, { align: "end", className: "cms:min-w-52", children: [
              D && b !== null && /* @__PURE__ */ e.jsxs(
                a.DropdownMenuItem,
                {
                  disabled: o.processing || o.isDirty,
                  title: o.isDirty ? void 0 : s("Fill in what isn't translated yet, into the draft"),
                  onSelect: () => j.router.post(B(`cms/entries/${t.id}/translations/${t.locale}/translate`), { version: t.version }, { preserveScroll: !0 }),
                  children: [
                    /* @__PURE__ */ e.jsx(we, {}),
                    " ",
                    o.isDirty ? s("Save to translate") : s("Translate from :language", { language: r.find((i) => i.main)?.name ?? (M ? V(M) : s("the main language")) })
                  ]
                }
              ),
              Q && /* @__PURE__ */ e.jsxs(a.DropdownMenuItem, { title: s("A link that shows the saved draft to anyone, without signing in, for a while"), onSelect: () => he(!0), children: [
                /* @__PURE__ */ e.jsx(Ss, {}),
                " ",
                s("Share preview link…")
              ] }),
              w.create && /* @__PURE__ */ e.jsxs(a.DropdownMenuItem, { title: s("Copy every language as a new draft"), onSelect: () => j.router.post(`${y}/duplicate`), children: [
                /* @__PURE__ */ e.jsx(Me, {}),
                " ",
                s("Duplicate")
              ] }),
              q && /* @__PURE__ */ e.jsx(a.DropdownMenuItem, { asChild: !0, children: /* @__PURE__ */ e.jsxs(j.Link, { href: q, children: [
                /* @__PURE__ */ e.jsx(ys, {}),
                " ",
                s("Edit blueprint")
              ] }) }),
              w.delete && !$.readOnly && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
                /* @__PURE__ */ e.jsx(a.DropdownMenuSeparator, {}),
                /* @__PURE__ */ e.jsxs(
                  a.DropdownMenuItem,
                  {
                    className: "cms:text-destructive",
                    onSelect: () => z(s('Move ":title" to the trash? It comes off the site; you can restore it.', { title: c.title }) + Ce(m), () => j.router.delete(y), s("Move to trash")),
                    children: [
                      /* @__PURE__ */ e.jsx(ve, {}),
                      " ",
                      s("Move to trash")
                    ]
                  }
                )
              ] })
            ] })
          ] }),
          t && D && N && /* @__PURE__ */ e.jsxs("span", { title: s("Machine translation isn't set up on this site: ask your developer (SUNRICE_TRANSLATE_DRIVER, see Help → Developer docs → Machine translation)."), children: [
            /* @__PURE__ */ e.jsxs(a.Button, { type: "button", variant: "outline", disabled: !0, "aria-describedby": "machine-translate-missing", children: [
              /* @__PURE__ */ e.jsx(we, {}),
              " ",
              s("Translate from :language", { language: r.find((i) => i.main)?.name ?? (M ? V(M) : s("the main language")) })
            ] }),
            /* @__PURE__ */ e.jsx("span", { id: "machine-translate-missing", className: "cms:sr-only", children: s("Machine translation isn't set up on this site: ask your developer.") })
          ] }),
          D && /* @__PURE__ */ e.jsxs(a.Button, { type: "submit", variant: t ? "outline" : "default", disabled: o.processing, children: [
            o.processing && /* @__PURE__ */ e.jsx(_e, { className: "cms:animate-spin" }),
            t ? s("Save draft") : s("Create draft")
          ] }),
          t && !t.trashed && D && !w.publish && (t.status === "draft" || t.hasUnpublishedChanges || o.isDirty) && /* @__PURE__ */ e.jsxs(
            a.Button,
            {
              type: "button",
              disabled: o.processing,
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
            Y && E ? /* @__PURE__ */ e.jsxs(a.Button, { type: "button", variant: "outline", className: "cms:rounded-r-none", disabled: o.processing, title: s("Change the date"), onClick: () => H(!0), children: [
              /* @__PURE__ */ e.jsx(ce, {}),
              " ",
              s("Scheduled for :date", { date: S(t.publishedAt) })
            ] }) : /* @__PURE__ */ e.jsxs(a.Button, { type: "button", variant: E ? "outline" : "default", className: "cms:rounded-r-none cms:disabled:opacity-100", disabled: o.processing || E, onClick: () => X(J.at), children: [
              E && /* @__PURE__ */ e.jsx(Ae, { className: "cms:text-emerald-600 cms:dark:text-emerald-400" }),
              E ? s("Published") : J.action === "schedule" ? s("Schedule") : J.action === "backdate" ? s("Publish now, back-dated") : _ === "offline" ? s("Publish again") : t.status === "draft" ? s("Publish") : s("Publish changes")
            ] }),
            /* @__PURE__ */ e.jsxs(a.DropdownMenu, { children: [
              /* @__PURE__ */ e.jsx(a.DropdownMenuTrigger, { asChild: !0, children: /* @__PURE__ */ e.jsx(a.Button, { type: "button", size: "icon", variant: E ? "outline" : "default", className: E ? "cms:-ml-px cms:rounded-l-none" : "cms:rounded-l-none cms:border-l cms:border-primary-foreground/20", "aria-label": s("More publishing options"), children: /* @__PURE__ */ e.jsx(bs, {}) }) }),
              /* @__PURE__ */ e.jsxs(a.DropdownMenuContent, { align: "end", children: [
                /* @__PURE__ */ e.jsxs(a.DropdownMenuItem, { onSelect: () => H(!0), children: [
                  /* @__PURE__ */ e.jsx(ce, {}),
                  " ",
                  Y ? s("Change the date…") : s("Publish on a date…")
                ] }),
                Y && /* @__PURE__ */ e.jsx(a.DropdownMenuItem, { onSelect: () => X((/* @__PURE__ */ new Date()).toISOString()), children: s("Publish now") }),
                t.status !== "draft" && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
                  /* @__PURE__ */ e.jsx(a.DropdownMenuSeparator, {}),
                  /* @__PURE__ */ e.jsx(a.DropdownMenuItem, { onSelect: () => j.router.post(`${y}/unpublish`, R, { preserveScroll: !0 }), children: Y ? s("Unschedule (back to draft)") : s("Unpublish") })
                ] })
              ] })
            ] })
          ] })
        ] }),
        children: [
          t && (t.trashed ? /* @__PURE__ */ e.jsx(a.Badge, { variant: "secondary", children: s("In the trash") }) : /* @__PURE__ */ e.jsx(je, { status: t.status, changes: t.status !== "draft" && t.hasUnpublishedChanges })),
          t?.review && !t.trashed && /* @__PURE__ */ e.jsx(a.Badge, { variant: "warning", title: t.review.by ? s(":name sent it on :date", { name: t.review.by, date: S(t.review.requestedAt) }) : s("Sent on :date", { date: S(t.review.requestedAt) }), children: s("Waiting for review") })
        ]
      }
    ),
    t && _ && /* @__PURE__ */ e.jsx(
      Hs,
      {
        state: _,
        entry: t,
        dirty: o.isDirty,
        actions: ts(_, { liveUrl: t.url !== null, pages: Q, canUpdate: D }),
        onCompare: () => ue(!0),
        onDiscard: () => z(
          s(`Discard the unpublished changes to ":title"? The editor goes back to the live version, as visitors see it. This can't be undone.`, { title: c.title }) + (o.isDirty ? ` ${s("Your unsaved edits are lost too.")}` : ""),
          () => j.router.post(B(`cms/entries/${t.id}/translations/${t.locale}/discard`), { version: t.version }, { preserveScroll: !0 }),
          s("Discard changes")
        )
      }
    ),
    t && r.length > 1 && /* @__PURE__ */ e.jsx(
      Rs,
      {
        entryUrl: y,
        editUrl: `${K}/${t.id}/edit`,
        current: t.locale,
        locales: r,
        canAdd: (w.create || w.translate === !0) && !t.trashed,
        canRemove: w.delete && !t.isMain && !t.trashed,
        onRemove: () => z(
          s('Remove the :language translation of ":title"? Its revisions go with it.', { language: V(t.locale), title: c.title }),
          () => j.router.delete(`${y}/translations/${t.locale}`)
        )
      }
    ),
    /* @__PURE__ */ e.jsx(a.ViewingNotice, { by: $.viewingBy, onTakeOver: $.requestTakeOver }),
    /* @__PURE__ */ e.jsx(a.KeptEditsNotice, { kept: $.kept, disabled: !D, onLoad: (i) => {
      Qe(i);
    }, onDiscard: (i) => {
      $.discardKept(i);
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
            disabled: o.processing,
            onClick: () => z(s("Save your version over theirs? Their changes are replaced (their earlier published versions stay in the revisions)."), Je),
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
                value: o.data.title,
                "aria-invalid": C.title !== void 0,
                onChange: (i) => {
                  const v = i.target.value;
                  o.setData((T) => ({ ...T, title: v, slug: as(T.slug, T.title, v, t !== null && t.publishedAt === null && t.status === "draft") })), O("title");
                }
              }
            ),
            /* @__PURE__ */ e.jsx(P, { message: C.title })
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
                value: o.data.slug,
                placeholder: s("Made from the title"),
                "aria-invalid": C.slug !== void 0,
                onChange: (i) => {
                  o.setData("slug", i.target.value), O("slug");
                }
              }
            ),
            /* @__PURE__ */ e.jsx(fs, { note: ls(t?.publishedSlug, o.data.slug, t !== null && t.status !== "draft"), redirectsUrl: Oe }),
            /* @__PURE__ */ e.jsx(P, { message: C.slug })
          ] })
        ] }) }) }),
        /* @__PURE__ */ e.jsx(Be.Provider, { value: le, children: /* @__PURE__ */ e.jsx(
          xs,
          {
            disabled: !D,
            fields: n,
            values: o.data.data,
            errors: C,
            storageKey: `cms:entry:${l.handle}`,
            shared: d,
            sharedValues: h,
            changed: W,
            mainLanguage: r.find((i) => i.main)?.name ?? (M ? V(M) : null),
            onChange: (i, v) => {
              o.setData("data", { ...o.data.data, [i]: v }), O(`data.${i}`);
            }
          }
        ) }),
        /* @__PURE__ */ e.jsx(a.CollapsibleCard, { title: W.some((i) => i.startsWith("seo.")) ? /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          s("SEO"),
          /* @__PURE__ */ e.jsx(Z, {})
        ] }) : s("SEO"), description: s("How this entry appears in search results and shared links."), titleClassName: "cms:text-base", storageKey: "cms:entry:seo", hasErrors: ws(C, "seo"), children: /* @__PURE__ */ e.jsx("fieldset", { disabled: !D, className: "cms:min-w-0", children: /* @__PURE__ */ e.jsx(
          vs,
          {
            bare: !0,
            id: "seo",
            fields: os(),
            value: o.data.seo,
            errors: js(C, "seo"),
            onChange: (i) => {
              o.setData("seo", i), O("seo");
            }
          }
        ) }) })
      ] }),
      !t && (l.hierarchical || g.length > 0) && /* @__PURE__ */ e.jsxs("aside", { className: "cms:flex cms:min-w-0 cms:flex-col cms:gap-4", children: [
        l.hierarchical && /* @__PURE__ */ e.jsx(a.CollapsibleCard, { title: "Page settings", titleClassName: "cms:text-base", storageKey: "cms:entry:page-settings", hasErrors: C.parent_id !== void 0, children: /* @__PURE__ */ e.jsx("fieldset", { disabled: !D, className: "cms:flex cms:min-w-0 cms:flex-col cms:gap-4 cms:text-sm", children: /* @__PURE__ */ e.jsx(Re, { collection: l, value: o.data.parent_id, error: C.parent_id, onChange: (i) => pe({ parent_id: i }) }) }) }),
        /* @__PURE__ */ e.jsx(
          $e,
          {
            taxonomies: g,
            value: o.data.terms,
            labels: le,
            errors: C,
            changed: W,
            disabled: !D || w.terms !== !0,
            onChange: (i, v) => {
              o.setData("terms", { ...o.data.terms, [i]: v }), O(`terms.${i}`);
            }
          }
        )
      ] }),
      t && /* @__PURE__ */ e.jsxs("aside", { className: "cms:flex cms:min-w-0 cms:flex-col cms:gap-4", children: [
        /* @__PURE__ */ e.jsxs(a.CollapsibleCard, { title: s("Status"), titleClassName: "cms:text-base", storageKey: "cms:entry:status", contentClassName: "cms:flex cms:flex-col cms:gap-3 cms:text-sm", children: [
          /* @__PURE__ */ e.jsxs("dl", { className: "cms:flex cms:flex-col cms:gap-2", children: [
            /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:justify-between cms:gap-3", children: [
              /* @__PURE__ */ e.jsx("dt", { className: "cms:text-muted-foreground", children: s("Status") }),
              /* @__PURE__ */ e.jsx("dd", { className: "cms:flex cms:flex-wrap cms:justify-end cms:gap-1", children: t.trashed ? /* @__PURE__ */ e.jsx(a.Badge, { variant: "secondary", children: s("In the trash") }) : /* @__PURE__ */ e.jsx(je, { status: t.status, changes: t.status !== "draft" && t.hasUnpublishedChanges }) })
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
            w.publish && !$.readOnly && /* @__PURE__ */ e.jsxs(a.Button, { type: "button", variant: "outline", size: "sm", disabled: o.processing, onClick: () => te(!0), children: [
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
                disabled: o.processing,
                title: s("Take the request back, to keep working on it"),
                onClick: () => j.router.post(`${y}/review/withdraw`, R, { preserveScroll: !0 }),
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
              processing: o.processing,
              onPublish: (i) => X(i),
              onUnpublish: () => j.router.post(`${y}/unpublish`, R, { preserveScroll: !0 })
            }
          ),
          F?.is && /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: s("This is the site's homepage.") }),
          F && !F.is && F.can && t.status === "published" && !t.trashed && /* @__PURE__ */ e.jsx(
            a.Button,
            {
              type: "button",
              variant: "outline",
              size: "sm",
              className: "cms:mt-1 cms:self-start",
              onClick: () => z(
                (F.current ? s('Make ":title" the homepage? Visitors to / will see it instead of ":current".', { title: c.title, current: F.current }) : s('Make ":title" the homepage? Visitors to / will see it.', { title: c.title })) + " " + s("Its own address will lead to / as well."),
                () => j.router.post(`${y}/homepage`, {}, { preserveScroll: !0 }),
                s("Make this the homepage")
              ),
              children: s("Make this the homepage")
            }
          ),
          r.find((i) => i.code === t.locale)?.outdated && /* @__PURE__ */ e.jsx("p", { className: "cms:text-amber-700 cms:dark:text-amber-400", children: M ? s("The :language version changed since this translation was last saved.", { language: V(M) }) : s("The main version changed since this translation was last saved.") })
        ] }),
        /* @__PURE__ */ e.jsxs(a.CollapsibleCard, { title: s("Used by"), titleClassName: "cms:text-base", storageKey: "cms:entry:used-by", contentClassName: "cms:flex cms:flex-col cms:gap-1 cms:text-sm", children: [
          m.length === 0 && /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: s("No other content links here.") }),
          m.map((i) => /* @__PURE__ */ e.jsxs("div", { className: "cms:min-w-0", children: [
            i.url ? /* @__PURE__ */ e.jsx("a", { href: i.url, className: "cms:block cms:truncate cms:underline-offset-4 cms:hover:underline", children: i.label }) : /* @__PURE__ */ e.jsx("span", { className: "cms:block cms:truncate", children: i.label }),
            /* @__PURE__ */ e.jsx("span", { className: "cms:text-xs cms:text-muted-foreground", title: i.field, children: i.fieldLabel ?? i.field })
          ] }, `${i.label}:${i.field}`))
        ] }),
        A && /* @__PURE__ */ e.jsx(
          Ws,
          {
            entryUrl: y,
            collection: l,
            settings: A,
            templates: ds(Ve, Ue),
            blueprints: L,
            disabled: !D,
            values: o.data,
            errors: C,
            onChange: pe,
            draftDirty: o.isDirty,
            commentCount: p ? p.counts.pending + p.counts.approved : null
          }
        ),
        /* @__PURE__ */ e.jsx(
          $e,
          {
            taxonomies: g,
            value: o.data.terms,
            labels: le,
            errors: C,
            changed: W,
            disabled: !D || w.terms !== !0,
            onChange: (i, v) => {
              o.setData("terms", { ...o.data.terms, [i]: v }), O(`terms.${i}`);
            }
          }
        ),
        p !== null && l.comments && /* @__PURE__ */ e.jsx(Es, { entryId: t.id, comments: p }),
        /* @__PURE__ */ e.jsxs(a.CollapsibleCard, { title: s("Revisions"), titleClassName: "cms:text-base", storageKey: "cms:entry:revisions", contentClassName: "cms:flex cms:flex-col cms:gap-2 cms:text-sm", children: [
          f !== null && w.update && /* @__PURE__ */ e.jsxs(a.Button, { type: "button", variant: "outline", size: "sm", onClick: () => j.router.post(B(`cms/entries/${t.id}/translations/${t.locale}/undo-restore`), {}, { preserveScroll: !0 }), children: [
            /* @__PURE__ */ e.jsx(re, {}),
            " ",
            s("Undo the restore")
          ] }),
          /* @__PURE__ */ e.jsx(j.Deferred, { data: "revisions", fallback: /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
            /* @__PURE__ */ e.jsx(a.Skeleton, { className: "cms:h-8" }),
            /* @__PURE__ */ e.jsx(a.Skeleton, { className: "cms:h-8" })
          ] }), children: /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
            (x ?? []).length === 0 && /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: s("Each publish keeps one.") }),
            (x ?? []).map((i) => /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-1 cms:border-b cms:border-border/60 cms:pb-2 cms:last:border-b-0 cms:last:pb-0", children: [
              /* @__PURE__ */ e.jsxs("div", { className: "cms:min-w-0", children: [
                /* @__PURE__ */ e.jsx("div", { className: "cms:truncate", children: i.title }),
                /* @__PURE__ */ e.jsxs("div", { className: "cms:text-xs cms:text-muted-foreground", children: [
                  S(i.createdAt),
                  i.author ? ` · ${i.author}` : ""
                ] }),
                /* @__PURE__ */ e.jsx("div", { className: "cms:text-xs cms:text-muted-foreground", children: i.changed === null ? s("First kept version") : i.changed.length === 0 ? s("No field changed") : s("Changed: :fields", { fields: i.changed.join(", ") }) })
              ] }),
              /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:gap-1", children: [
                /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "ghost", size: "sm", onClick: () => me(i), children: s("Compare") }),
                w.update && !t.trashed && /* @__PURE__ */ e.jsx(
                  a.Button,
                  {
                    type: "button",
                    variant: "ghost",
                    size: "sm",
                    onClick: () => j.router.post(B(`cms/entries/${t.id}/revisions/${i.id}/restore`), {}, { preserveScroll: !0 }),
                    children: s("Restore")
                  }
                )
              ] })
            ] }, i.id))
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
        onSend: (i, v) => j.router.post(`${y}/review/send-back`, { ...R, note: i }, { preserveScroll: !0, onSuccess: () => {
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
          dirty: o.isDirty,
          url: B(`cms/entries/${t.id}/translations/${t.locale}/compare-live`),
          read: (i) => ({ label: String(i.label), old: String(i.live ?? ""), new: String(i.draft ?? "") }),
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
          open: I !== null,
          onClose: () => me(null),
          dirty: o.isDirty,
          url: I ? B(`cms/entries/${t.id}/revisions/${I.id}/compare`) : null,
          read: (i) => ({ label: String(i.label), old: String(i.revision ?? ""), new: String(i.draft ?? "") }),
          title: s("Version of :date compared with :current", { date: S(I?.createdAt), current: Se(_) }),
          description: s("A version published earlier, beside :current. Removed words are struck through, added ones highlighted.", { current: Se(_) }),
          oldLabel: I ? qs(I) : "",
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
        processing: o.processing,
        rescheduling: Y,
        current: t?.publishedAt ?? null,
        onSchedule: (i) => X(i)
      }
    )
  ] });
}
function Is({ open: l, onClose: n, by: r, onSend: d }) {
  const [h, t] = k.useState(""), [c, x] = k.useState(!1), p = j.usePage().props.errors ?? {};
  return k.useEffect(() => {
    l && t("");
  }, [l]), /* @__PURE__ */ e.jsx(a.Dialog, { open: l, onOpenChange: (u) => !u && !c && n(), children: /* @__PURE__ */ e.jsxs(a.DialogContent, { children: [
    /* @__PURE__ */ e.jsxs(a.DialogHeader, { children: [
      /* @__PURE__ */ e.jsx(a.DialogTitle, { children: s("Send back without publishing") }),
      /* @__PURE__ */ e.jsx(a.DialogDescription, { children: r ? s(":name gets an email with your note, and the request is cleared. The draft stays as it is.", { name: r }) : s("The one who asked gets an email with your note, and the request is cleared. The draft stays as it is.") })
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
          onChange: (u) => t(u.target.value)
        }
      ),
      /* @__PURE__ */ e.jsx(P, { message: p.note })
    ] }),
    /* @__PURE__ */ e.jsxs(a.DialogFooter, { children: [
      /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "outline", disabled: c, onClick: n, children: s("Cancel") }),
      /* @__PURE__ */ e.jsxs(a.Button, { type: "button", disabled: c, onClick: () => {
        x(!0), d(h, () => x(!1));
      }, children: [
        c && /* @__PURE__ */ e.jsx(_e, { className: "cms:animate-spin" }),
        " ",
        s("Send back")
      ] })
    ] })
  ] }) });
}
function Rs({ entryUrl: l, editUrl: n, current: r, locales: d, canAdd: h, canRemove: t, onRemove: c }) {
  return /* @__PURE__ */ e.jsx(
    a.LanguageTabs,
    {
      value: r,
      languages: gs(d, h, s, rs, V),
      onValueChange: (x) => j.router.get(n, { locale: x }),
      onAdd: (x) => j.router.post(`${l}/translations`, { locale: x }),
      actions: t ? /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "ghost", size: "sm", className: "cms:text-destructive", onClick: c, children: s("Remove this language") }) : void 0
    }
  );
}
function Os({ status: l, value: n, onChange: r, dated: d, processing: h, onPublish: t, onUnpublish: c }) {
  const x = d.action !== "now", p = {
    now: s("Publish"),
    schedule: l === "scheduled" ? s("Reschedule") : s("Schedule"),
    backdate: s("Publish now, back-dated"),
    redate: s("Change date")
  }[d.action];
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2 cms:border-t cms:border-border/60 cms:pt-3", children: [
    /* @__PURE__ */ e.jsx(a.Label, { htmlFor: "entry-published-at", children: s("Publish date") }),
    /* @__PURE__ */ e.jsx(a.DatePicker, { id: "entry-published-at", withTime: !0, className: "cms:max-w-none", value: n || null, onChange: (u) => r(u ?? "") }),
    /* @__PURE__ */ e.jsx("p", { className: "cms:text-xs cms:text-muted-foreground", children: l === "draft" ? s("Empty: now. A date in the future schedules it.") : s("The date shown as published. A date in the future takes it off the site until then.") }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:gap-2", children: [
      (l === "draft" || x) && /* @__PURE__ */ e.jsxs(a.Button, { type: "button", size: "sm", disabled: h, onClick: () => t(d.at), children: [
        /* @__PURE__ */ e.jsx(ce, {}),
        " ",
        p
      ] }),
      l !== "draft" && /* @__PURE__ */ e.jsx(a.Button, { type: "button", size: "sm", variant: "outline", disabled: h, onClick: c, children: s("Unpublish") })
    ] })
  ] });
}
function Vs({ open: l, onClose: n, onSchedule: r, current: d, processing: h, rescheduling: t }) {
  const [c, x] = k.useState("");
  k.useEffect(() => {
    l && x(Te(is(d)));
  }, [l, d]);
  const p = c === "" ? null : new Date(c), u = p !== null && p.getTime() <= Date.now();
  return /* @__PURE__ */ e.jsx(a.Dialog, { open: l, onOpenChange: (m) => !m && n(), children: /* @__PURE__ */ e.jsxs(a.DialogContent, { children: [
    /* @__PURE__ */ e.jsxs(a.DialogHeader, { children: [
      /* @__PURE__ */ e.jsx(a.DialogTitle, { children: t ? s("Change the publish date") : s("Publish on a date") }),
      /* @__PURE__ */ e.jsx(a.DialogDescription, { children: s("The entry goes live then.") })
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
      /* @__PURE__ */ e.jsx(a.Label, { htmlFor: "published-at", children: s("Date and time") }),
      /* @__PURE__ */ e.jsx(a.DatePicker, { id: "published-at", withTime: !0, required: !0, className: "cms:max-w-none", value: c || null, onChange: (m) => x(m ?? "") }),
      /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: s("In your time zone.") }),
      u && /* @__PURE__ */ e.jsx("p", { role: "alert", className: "cms:text-sm cms:text-amber-700 cms:dark:text-amber-400", children: s("This date has passed: the entry goes live now, dated :date.", { date: S(p.toISOString()) }) })
    ] }),
    /* @__PURE__ */ e.jsxs(a.DialogFooter, { children: [
      /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "outline", onClick: n, children: s("Cancel") }),
      /* @__PURE__ */ e.jsx(a.Button, { type: "button", disabled: p === null || h, onClick: () => p && r(p.toISOString()), children: u ? s("Publish now, back-dated") : t ? s("Change the date") : s("Schedule") })
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
function Hs({ state: l, entry: n, dirty: r, actions: d, onCompare: h, onDiscard: t }) {
  const c = n.live, x = c?.publishedAt ? c.by ? s("the version published on :date by :name", { date: S(c.publishedAt), name: c.by }) : s("the version published on :date", { date: S(c.publishedAt) }) : s("the version last published"), p = {
    draft: { title: s("Not published yet"), text: s("Only people who can edit see it."), tone: "muted" },
    offline: { title: s("Taken off the site"), text: s("Only people who can edit see it."), tone: "muted" },
    scheduled: { title: s("Scheduled"), text: s("Goes live on :date.", { date: S(n.publishedAt) }), tone: "scheduled" },
    "scheduled-changes": { title: s("Scheduled, with unpublished changes"), text: s("Goes live on :date with :version; your changes since aren't in it.", { date: S(n.publishedAt), version: x }), tone: "pending" },
    live: { title: s("Live"), text: r ? s("Visitors see what was last published.") : s("Visitors see exactly this."), tone: "live" },
    "live-changes": { title: s("Live, with unpublished changes"), text: s("Visitors still see :version.", { version: x }), tone: "pending" },
    trashed: { title: s("In the trash"), text: s("It's off the site. Restore it to edit it again."), tone: "trash" }
  }, { title: u, text: m, tone: f } = p[l], b = { muted: "cms:bg-muted-foreground/50", live: "cms:bg-emerald-500", pending: "cms:bg-amber-500", scheduled: "cms:bg-sky-500", trash: "cms:bg-destructive" }[f], N = f === "pending" ? "cms:border-amber-500/40 cms:bg-amber-500/5" : f === "live" ? "cms:border-emerald-500/30 cms:bg-emerald-500/5" : "cms:border-border cms:bg-card", A = ns(l);
  return /* @__PURE__ */ e.jsxs(
    "section",
    {
      "aria-label": s("Publishing status"),
      "data-state": l,
      className: `cms:flex cms:flex-col cms:gap-3 cms:rounded-lg cms:border cms:px-4 cms:py-3 cms:md:flex-row cms:md:items-center cms:md:justify-between ${N}`,
      children: [
        /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:min-w-0 cms:items-start cms:gap-3", children: [
          /* @__PURE__ */ e.jsx("span", { "aria-hidden": !0, className: `cms:mt-1.5 cms:size-2.5 cms:shrink-0 cms:rounded-full ${b}` }),
          /* @__PURE__ */ e.jsxs("div", { className: "cms:min-w-0 cms:text-sm", children: [
            /* @__PURE__ */ e.jsx("p", { className: "cms:font-medium", children: u }),
            /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: m }),
            r && /* @__PURE__ */ e.jsx("p", { className: "cms:text-amber-700 cms:dark:text-amber-400", children: s("You have unsaved edits.") })
          ] })
        ] }),
        (d.viewLive || d.compare || d.preview || d.discard) && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:gap-2 cms:md:justify-end", children: [
          d.viewLive && n.url && /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "outline", size: "sm", asChild: !0, children: /* @__PURE__ */ e.jsxs("a", { href: n.url, target: "_blank", rel: "noopener noreferrer", children: [
            /* @__PURE__ */ e.jsx(Ds, {}),
            " ",
            s("View live page")
          ] }) }),
          d.compare && /* @__PURE__ */ e.jsxs(a.Button, { type: "button", variant: "outline", size: "sm", onClick: h, children: [
            /* @__PURE__ */ e.jsx(As, {}),
            " ",
            s("Compare with live")
          ] }),
          d.preview && /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "outline", size: "sm", asChild: !0, children: /* @__PURE__ */ e.jsxs(
            "a",
            {
              href: n.previewUrl,
              target: "_blank",
              rel: "noopener noreferrer",
              title: r ? s("Shows what's saved: save first to see your unsaved edits.") : s("Shows what's saved, as visitors would see it once published."),
              children: [
                /* @__PURE__ */ e.jsx(Ts, {}),
                " ",
                A ? s("Preview changes") : s("Preview")
              ]
            }
          ) }),
          d.discard && /* @__PURE__ */ e.jsxs(a.Button, { type: "button", variant: "ghost", size: "sm", className: "cms:text-destructive", onClick: t, children: [
            /* @__PURE__ */ e.jsx(re, {}),
            " ",
            s("Discard changes")
          ] })
        ] })
      ]
    }
  );
}
function ye({ old: l, next: n, side: r }) {
  if ((r === "old" ? l : n).trim() === "") return /* @__PURE__ */ e.jsx("span", { className: "cms:text-muted-foreground cms:italic", children: s("(empty)") });
  const h = Ls(_s(l, n), r);
  return /* @__PURE__ */ e.jsx(e.Fragment, { children: h.map((t, c) => t.op === "same" ? /* @__PURE__ */ e.jsx(k.Fragment, { children: t.text }, c) : t.op === "removed" ? /* @__PURE__ */ e.jsx("del", { className: "cms:rounded-sm cms:bg-red-500/15 cms:text-red-900 cms:decoration-red-500/60 cms:dark:text-red-200", children: t.text }, c) : /* @__PURE__ */ e.jsx("ins", { className: "cms:rounded-sm cms:bg-emerald-500/20 cms:text-emerald-900 cms:no-underline cms:dark:text-emerald-200", children: t.text }, c)) });
}
function De({ open: l, url: n, read: r, title: d, description: h, oldLabel: t, newLabel: c, same: x, onClose: p, dirty: u }) {
  const [m, f] = k.useState(null), [b, N] = k.useState(!1), A = k.useRef(r);
  return A.current = r, k.useEffect(() => {
    if (f(null), N(!1), !l || !n) return;
    let g = !0;
    return fetch(n, { headers: { Accept: "application/json" }, credentials: "same-origin" }).then((L) => L.ok ? L.json() : Promise.reject(new Error(String(L.status)))).then((L) => {
      g && f(L.fields.map((q) => A.current(q)));
    }).catch(() => {
      g && N(!0);
    }), () => {
      g = !1;
    };
  }, [l, n]), /* @__PURE__ */ e.jsx(a.Dialog, { open: l, onOpenChange: (g) => !g && p(), children: /* @__PURE__ */ e.jsxs(a.DialogContent, { className: "cms:max-h-[85vh] cms:overflow-y-auto cms:sm:max-w-3xl", children: [
    /* @__PURE__ */ e.jsxs(a.DialogHeader, { children: [
      /* @__PURE__ */ e.jsx(a.DialogTitle, { children: d }),
      /* @__PURE__ */ e.jsxs(a.DialogDescription, { children: [
        h,
        u ? ` ${s("Your unsaved edits aren't included.")}` : ""
      ] })
    ] }),
    b && /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-destructive", children: s("The comparison could not be loaded. Try again.") }),
    !b && m === null && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
      /* @__PURE__ */ e.jsx(a.Skeleton, { className: "cms:h-12" }),
      /* @__PURE__ */ e.jsx(a.Skeleton, { className: "cms:h-12" })
    ] }),
    m?.length === 0 && /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: x }),
    m && m.length > 0 && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-4 cms:text-sm", children: [
      /* @__PURE__ */ e.jsxs("div", { "aria-hidden": !0, className: "cms:hidden cms:gap-2 cms:text-xs cms:font-medium cms:text-muted-foreground cms:sm:grid cms:sm:grid-cols-2", children: [
        /* @__PURE__ */ e.jsx("span", { children: t }),
        /* @__PURE__ */ e.jsx("span", { children: c })
      ] }),
      /* @__PURE__ */ e.jsx("dl", { className: "cms:flex cms:flex-col cms:gap-4", children: m.map((g) => /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-1", children: [
        /* @__PURE__ */ e.jsx("dt", { className: "cms:font-medium", children: g.label }),
        /* @__PURE__ */ e.jsxs("dd", { className: "cms:grid cms:gap-2 cms:sm:grid-cols-2", children: [
          /* @__PURE__ */ e.jsxs("div", { className: "cms:rounded-md cms:border cms:bg-muted/30 cms:p-2 cms:break-words cms:whitespace-pre-wrap", children: [
            /* @__PURE__ */ e.jsx("span", { className: "cms:block cms:text-xs cms:text-muted-foreground cms:sm:sr-only", children: t }),
            /* @__PURE__ */ e.jsx(ye, { old: g.old, next: g.new, side: "old" })
          ] }),
          /* @__PURE__ */ e.jsxs("div", { className: "cms:rounded-md cms:border cms:bg-muted/30 cms:p-2 cms:break-words cms:whitespace-pre-wrap", children: [
            /* @__PURE__ */ e.jsx("span", { className: "cms:block cms:text-xs cms:text-muted-foreground cms:sm:sr-only", children: c }),
            /* @__PURE__ */ e.jsx(ye, { old: g.old, next: g.new, side: "new" })
          ] })
        ] })
      ] }, g.label)) })
    ] }),
    /* @__PURE__ */ e.jsx(a.DialogFooter, { children: /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "outline", onClick: p, children: s("Close") }) })
  ] }) });
}
function Ys({ open: l, onClose: n, url: r, expiresAt: d }) {
  const h = () => {
    navigator.clipboard?.writeText(r).then(() => a.toast.success(s("Link copied.")), () => a.toast.error(s("Couldn't copy: select the link and copy it.")));
  };
  return /* @__PURE__ */ e.jsx(a.Dialog, { open: l, onOpenChange: (t) => !t && n(), children: /* @__PURE__ */ e.jsxs(a.DialogContent, { children: [
    /* @__PURE__ */ e.jsxs(a.DialogHeader, { children: [
      /* @__PURE__ */ e.jsx(a.DialogTitle, { children: s("Share preview link") }),
      /* @__PURE__ */ e.jsx(a.DialogDescription, { children: s("Anyone with this link sees what's saved, as the page would look published, without signing in. Visitors of the site don't see it.") })
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
      /* @__PURE__ */ e.jsx(a.Label, { htmlFor: "preview-link", children: s("Preview link") }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(a.Input, { id: "preview-link", readOnly: !0, value: r, className: "cms:font-mono cms:text-xs", onFocus: (t) => t.target.select() }),
        /* @__PURE__ */ e.jsxs(a.Button, { type: "button", variant: "outline", onClick: h, children: [
          /* @__PURE__ */ e.jsx(Me, {}),
          " ",
          s("Copy")
        ] })
      ] }),
      /* @__PURE__ */ e.jsxs("p", { className: "cms:text-sm cms:text-muted-foreground", children: [
        d ? s("It stops working at :time. Reload the editor for a new one.", { time: S(d) }) : s("It stops working after a while. Reload the editor for a new one."),
        " ",
        s("It shows changes saved after you share it too.")
      ] })
    ] }),
    /* @__PURE__ */ e.jsx(a.DialogFooter, { children: /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "outline", onClick: n, children: s("Close") }) })
  ] }) });
}
function Re({ collection: l, value: n, error: r, onChange: d }) {
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:min-w-0 cms:flex-col cms:gap-2", children: [
    /* @__PURE__ */ e.jsx(a.Label, { htmlFor: "parent", children: s("Parent") }),
    /* @__PURE__ */ e.jsx(
      us,
      {
        id: "parent",
        multiple: !1,
        max: 1,
        collections: [l.handle],
        invalid: r !== void 0,
        value: n,
        onChange: (h) => d(typeof h == "number" ? h : null)
      }
    ),
    /* @__PURE__ */ e.jsx(P, { message: r })
  ] });
}
function Ws({ entryUrl: l, collection: n, settings: r, templates: d, blueprints: h, disabled: t, values: c, errors: x, onChange: p, draftDirty: u, commentCount: m = null }) {
  const f = h.length > 1 ? r.blueprint ?? h[0].handle : void 0, b = j.useForm({ blueprint: f ?? "" }), N = b.errors.blueprint, A = ["parent_id", "template", "comments_closed"].some((g) => x[g] !== void 0) || N !== void 0;
  return /* @__PURE__ */ e.jsx(a.CollapsibleCard, { title: s("Page settings"), titleClassName: "cms:text-base", storageKey: "cms:entry:page-settings", hasErrors: A, children: /* @__PURE__ */ e.jsxs("fieldset", { disabled: t, className: "cms:flex cms:min-w-0 cms:flex-col cms:gap-4 cms:text-sm", children: [
    n.hierarchical && /* @__PURE__ */ e.jsx(Re, { collection: n, value: c.parent_id, error: x.parent_id, onChange: (g) => p({ parent_id: g }) }),
    h.length > 1 && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
      /* @__PURE__ */ e.jsx(a.Label, { htmlFor: "blueprint", children: s("Blueprint") }),
      /* @__PURE__ */ e.jsxs(a.Select, { value: b.data.blueprint, onValueChange: (g) => b.setData("blueprint", g), children: [
        /* @__PURE__ */ e.jsx(a.SelectTrigger, { id: "blueprint", className: "cms:w-full cms:min-w-0", "aria-invalid": N !== void 0, children: /* @__PURE__ */ e.jsx(a.SelectValue, {}) }),
        /* @__PURE__ */ e.jsx(a.SelectContent, { children: h.map((g) => /* @__PURE__ */ e.jsx(a.SelectItem, { value: g.handle, children: g.title }, g.handle)) })
      ] }),
      b.data.blueprint !== f && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
        /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: s("The fields change in every language. Values of fields the new blueprint doesn't have stay saved and come back if you switch back. The editor reloads.") }),
        /* @__PURE__ */ e.jsx(
          a.Button,
          {
            type: "button",
            size: "sm",
            className: "cms:w-fit",
            disabled: b.processing || u,
            "aria-describedby": u ? "blueprint-save-first" : void 0,
            onClick: () => b.put(`${l}/settings`, { preserveScroll: !0 }),
            children: s("Change blueprint")
          }
        ),
        u && /* @__PURE__ */ e.jsx("p", { id: "blueprint-save-first", className: "cms:text-xs cms:text-amber-700 cms:dark:text-amber-400", children: s("Save your draft first.") })
      ] }),
      /* @__PURE__ */ e.jsx(P, { message: N })
    ] }),
    /* @__PURE__ */ e.jsx(
      ms,
      {
        id: "template",
        value: c.template,
        onChange: (g) => p({ template: g }),
        lookup: d,
        example: `cms.${n.handle}-landing`,
        automatic: s("Automatic uses the collection's template."),
        error: x.template,
        disabled: t
      }
    ),
    n.comments && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-1 cms:border-t cms:border-border/60 cms:pt-4", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:justify-between cms:gap-3", children: [
        /* @__PURE__ */ e.jsx(a.Label, { htmlFor: "comments-open", className: "cms:whitespace-nowrap", children: s("Accept new comments") }),
        /* @__PURE__ */ e.jsx(a.Switch, { id: "comments-open", checked: !c.comments_closed, onCheckedChange: (g) => p({ comments_closed: !g }) })
      ] }),
      /* @__PURE__ */ e.jsx("a", { href: B(`cms/comments?entry=${l.split("/").slice(-1)[0]}`), className: "cms:w-fit cms:text-xs cms:text-muted-foreground cms:underline-offset-4 cms:hover:text-foreground cms:hover:underline", children: m === null ? s("View comments") : s("View comments (:count)", { count: m }) })
    ] })
  ] }) });
}
function $e({ taxonomies: l, value: n, labels: r, errors: d, changed: h, disabled: t, onChange: c }) {
  if (l.length === 0) return null;
  const x = h.some((u) => u.startsWith("terms.")), p = d.terms !== void 0 || l.some((u) => d[`terms.${u.handle}`] !== void 0);
  return /* @__PURE__ */ e.jsx(a.CollapsibleCard, { title: x ? /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    s("Taxonomies"),
    /* @__PURE__ */ e.jsx(Z, {})
  ] }) : s("Taxonomies"), titleClassName: "cms:text-base", storageKey: "cms:entry:taxonomies", hasErrors: p, children: /* @__PURE__ */ e.jsx(Be.Provider, { value: r, children: /* @__PURE__ */ e.jsxs("fieldset", { disabled: t, className: "cms:flex cms:min-w-0 cms:flex-col cms:gap-4 cms:text-sm", children: [
    l.map((u) => {
      const m = `terms-${u.handle}`, f = n[u.handle] ?? [], b = d[`terms.${u.handle}`];
      return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:min-w-0 cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsxs(a.Label, { htmlFor: m, children: [
          u.title,
          h.includes(`terms.${u.handle}`) && /* @__PURE__ */ e.jsx(Z, {})
        ] }),
        /* @__PURE__ */ e.jsx(
          Ns,
          {
            id: m,
            taxonomy: u.handle,
            multiple: !u.single,
            max: null,
            required: !1,
            invalid: b !== void 0,
            value: u.single ? f[0] ?? null : f,
            onChange: (N) => c(u.handle, N === null ? [] : Array.isArray(N) ? N : [N])
          }
        ),
        u.single && /* @__PURE__ */ e.jsx("p", { className: "cms:text-xs cms:text-muted-foreground", children: s("One term only.") }),
        /* @__PURE__ */ e.jsx(P, { message: b })
      ] }, u.handle);
    }),
    /* @__PURE__ */ e.jsx(P, { message: d.terms })
  ] }) }) });
}
export {
  ft as default
};
