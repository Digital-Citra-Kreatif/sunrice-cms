import { j as e, t as s, f as S, a as M, r as b, b as Me, d as as, e as ls, l as U, c as ns, g as is, h as rs, i as cs, k as os, s as ds } from "./admin-BJZuWFbX.js";
import { c as F, _ as k } from "./createLucideIcon-Ccbp7F45.js";
import { u as a } from "./ui-Dh5wfMwT.js";
import { u as ms, T as ve } from "./Confirm-DcnjU4f1.js";
import { s as us, w as hs, T as ps } from "./seo-CQmYxlxs.js";
import { E as we, a as _e, C as Z, T as xs } from "./TermsPicker-BllVnJA-.js";
import { E as gs } from "./EntriesPicker-BIdhV-Id.js";
import { C as Be } from "./check-OeKFYRnl.js";
import { S as fs, M as bs, U as re } from "./undo-2-CBzqSKK6.js";
import { F as js, e as vs } from "./languages-DNfJSvPI.js";
import { S as ws } from "./SlugNote-CwzzRF4s.js";
import { F as P } from "./FieldError-CrnP2AMi.js";
import { C as ks, z as Ns, b as Cs, h as Ss, A as ys } from "./FieldInput-Brfyzq5K.js";
import { R as Ds } from "./rotate-ccw-BcgdCn0y.js";
import { L as $s } from "./link-2-BYZeXgi5.js";
import { C as Le } from "./copy-BT7TBOUx.js";
import { L as Ts } from "./layout-template-RwJXNfEY.js";
import { L as Ee } from "./loader-circle-ByksABXO.js";
import { E as As } from "./external-link-CFxEu4M4.js";
const Pe = {
  name: "arrow-right",
  size: 24,
  node: [
    ["path", { d: "M5 12h14", key: "1ays0h" }],
    ["path", { d: "m12 5 7 7-7 7", key: "xquz4c" }]
  ]
};
Pe.node;
const ke = F(Pe);
const Fe = {
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
Fe.node;
const ce = F(Fe);
const ze = {
  name: "ellipsis-vertical",
  size: 24,
  node: [
    ["circle", { cx: "12", cy: "12", r: "1", key: "41hilf" }],
    ["circle", { cx: "12", cy: "5", r: "1", key: "gxeob9" }],
    ["circle", { cx: "12", cy: "19", r: "1", key: "lyex9k" }]
  ],
  aliases: ["more-vertical"]
};
ze.node;
const Ms = F(ze);
const Ie = {
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
Ie.node;
const _s = F(Ie);
const Re = {
  name: "git-compare",
  size: 24,
  node: [
    ["circle", { cx: "18", cy: "18", r: "3", key: "1xkwt0" }],
    ["circle", { cx: "6", cy: "6", r: "3", key: "1lh9wr" }],
    ["path", { d: "M13 6h3a2 2 0 0 1 2 2v7", key: "1yeb86" }],
    ["path", { d: "M11 18H8a2 2 0 0 1-2-2V9", key: "19pyzm" }]
  ]
};
Re.node;
const Bs = F(Re);
const Oe = {
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
Oe.node;
const Ne = F(Oe);
const Ve = {
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
Ve.node;
const Ls = F(Ve);
function Ce(n) {
  return n.match(/\n|[^\s]+[^\S\n]*|[^\S\n]+/g) ?? [];
}
const Es = 25e4;
function Ps(n, i) {
  if (n === i) return n === "" ? [] : [{ text: n, op: "same" }];
  const r = Ce(n), d = Ce(i);
  if (r.length * d.length > Es)
    return [...n ? [{ text: n, op: "removed" }] : [], ...i ? [{ text: i, op: "added" }] : []];
  const h = r.length + 1, t = d.length + 1, c = new Uint32Array(h * t);
  for (let f = r.length - 1; f >= 0; f--)
    for (let j = d.length - 1; j >= 0; j--)
      c[f * t + j] = r[f].trimEnd() === d[j].trimEnd() ? c[(f + 1) * t + j + 1] + 1 : Math.max(c[(f + 1) * t + j], c[f * t + j + 1]);
  const x = [], p = (f, j) => {
    const N = x[x.length - 1];
    N && N.op === j ? N.text += f : x.push({ text: f, op: j });
  };
  let u = 0, m = 0;
  for (; u < r.length && m < d.length; )
    r[u].trimEnd() === d[m].trimEnd() ? (p(d[m], "same"), u++, m++) : c[(u + 1) * t + m] >= c[u * t + m + 1] ? p(r[u++], "removed") : p(d[m++], "added");
  for (; u < r.length; ) p(r[u++], "removed");
  for (; m < d.length; ) p(d[m++], "added");
  return x;
}
function Fs(n, i) {
  return n.filter((r) => r.op === "same" || r.op === (i === "old" ? "removed" : "added"));
}
const Se = { preserveScroll: !0, preserveState: !0 };
function zs({ entryId: n, comments: i }) {
  const [r, d] = k.useState(null), [h, t] = k.useState(""), [c, x] = k.useState(!1), p = (m, f) => b.router.post(M(`cms/comments/${m}/status`), { status: f }, Se), u = (m) => b.router.post(M(`cms/comments/${m}/reply`), { body: h }, {
    ...Se,
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
      headerAction: i && i.counts.pending > 0 ? /* @__PURE__ */ e.jsx(a.Badge, { children: s(":count pending", { count: i.counts.pending }) }) : void 0,
      children: i ? /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
        /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: s(":approved approved · :pending pending · :spam spam", { approved: i.counts.approved, pending: i.counts.pending, spam: i.counts.spam }) }),
        i.latest.length === 0 && /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: s("No comments yet.") }),
        i.latest.map((m) => /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-1.5 cms:border-t cms:border-border/70 cms:pt-3 cms:first-of-type:border-t-0 cms:first-of-type:pt-0", children: [
          /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:gap-2", children: [
            /* @__PURE__ */ e.jsx("span", { className: "cms:min-w-0 cms:flex-1 cms:truncate cms:font-medium", children: m.author }),
            m.status === "pending" && /* @__PURE__ */ e.jsx(a.Badge, { variant: "outline", children: s("Pending") })
          ] }),
          /* @__PURE__ */ e.jsx("p", { className: "cms:line-clamp-3 cms:break-words cms:whitespace-pre-line", children: m.excerpt }),
          /* @__PURE__ */ e.jsxs("div", { className: "cms:text-xs cms:text-muted-foreground", children: [
            S(m.createdAt),
            m.reply ? ` · ${s("a reply")}` : ""
          ] }),
          i.canModerate && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:gap-1", children: [
            m.status === "pending" && /* @__PURE__ */ e.jsxs(a.Button, { type: "button", variant: "outline", size: "sm", onClick: () => p(m.id, "approved"), children: [
              /* @__PURE__ */ e.jsx(Be, {}),
              " ",
              s("Approve")
            ] }),
            /* @__PURE__ */ e.jsxs(a.Button, { type: "button", variant: "ghost", size: "sm", onClick: () => p(m.id, "spam"), children: [
              /* @__PURE__ */ e.jsx(fs, {}),
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
                  /* @__PURE__ */ e.jsx(bs, {}),
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
        /* @__PURE__ */ e.jsx("a", { href: M(`cms/comments?entry=${n}`), className: "cms:text-sm cms:font-medium cms:underline-offset-4 cms:hover:underline", children: s("All comments on this entry") })
      ] }) : /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(a.Skeleton, { className: "cms:h-10" }),
        /* @__PURE__ */ e.jsx(a.Skeleton, { className: "cms:h-10" })
      ] })
    }
  );
}
function Is(n, i) {
  const r = new Set(n), d = new Set(i);
  return r.size === d.size && [...r].every((h) => d.has(h));
}
function Rs(n, i) {
  const r = {}, d = {};
  for (const [h, t] of Object.entries(i)) {
    const c = n[h] ?? [];
    Is(c, t) || (r[h] = t.slice(), d[h] = c.slice());
  }
  return Object.keys(r).length === 0 ? null : { terms: r, terms_base: d };
}
function ye(n) {
  if (n.length === 0) return "";
  const i = n.slice(0, 5).map((r) => r.label).join("; ");
  return ` ${n.length > 5 ? s("It's used by :list and :count more: those links will show nothing.", { list: i, count: n.length - 5 }) : s("It's used by :list: those links will show nothing.", { list: i })}`;
}
function vt(n) {
  const { entry: i } = n;
  return /* @__PURE__ */ e.jsx(Os, { ...n }, i ? `${i.id}:${i.locale}:${i.version}:${i.status}:${i.trashed}:${i.publishedAt}` : "new");
}
function Os({ collection: n, fields: i, locales: r = [], shared: d = [], sharedValues: h = {}, entry: t, values: c, revisions: x, comments: p, termLabels: u, usedBy: m = [], undoRestore: f = null, machineTranslate: j = null, machineTranslateMissing: N = !1, settings: A, taxonomies: g = [], blueprints: L = [], blueprintUrl: q = null, homepage: z, redirectsUrl: qe = null, templates: Ke = null, templateChoices: He, links: oe = [], can: w }) {
  const K = M(`cms/collections/${n.handle}/entries`), y = t ? M(`cms/entries/${t.id}`) : K, ee = t ? c.title : s("New entry");
  a.useBreadcrumbs([{ label: n.title, href: K }, { label: ee }]);
  const [I, Ye] = ms(), [We, H] = k.useState(!1), se = t?.publishedAt ? Me(new Date(t.publishedAt)) : "", [de, me] = k.useState(se);
  k.useEffect(() => me(se), [se]);
  const [R, ue] = k.useState(null), [Ge, he] = k.useState(!1), [Je, pe] = k.useState(!1), [Qe, te] = k.useState(!1), o = b.useForm({
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
  }), xe = (l) => o.setData((v) => ({ ...v, ...l })), O = t ? { locale: t.locale } : {}, _ = r.find((l) => l.main)?.code, C = o.errors, G = b.usePage().props.errors ?? {}, V = (l) => {
    const v = ys(C, l);
    v.length > 0 && o.clearErrors(...v);
  }, E = t !== null && t.status !== "draft" && !t.hasUnpublishedChanges && !o.isDirty, J = as(t?.status ?? "draft", de, t?.publishedAt ?? null), ge = t === null ? w.create : w.update && !t.trashed, Y = t?.status === "scheduled", B = t ? ls(t) : null, W = t?.live?.changed ?? [], fe = (l) => W.includes(l) ? /* @__PURE__ */ e.jsx(Z, {}) : null, Q = n.pages !== !1, Xe = Array.isArray(c.terms) || !c.terms ? {} : c.terms, ae = (l, v = !1) => {
    const { terms: T, ...be } = l, ie = w.terms === !0 && g.length > 0 ? Rs(Xe, T) : null, je = ie === null ? be : { ...be, terms: ie.terms, ...v ? {} : { terms_base: ie.terms_base } };
    if (A || t === null) return je;
    const { parent_id: Xs, template: Zs, comments_closed: et, ...ts } = je;
    return ts;
  }, le = Array.isArray(u) || !u ? {} : u, ne = (l = !1, v = null) => {
    o.transform((T) => ({ ...ae(T), publish: l, published_at: v })), t ? o.put(y, { preserveScroll: !0, onSuccess: () => H(!1) }) : o.post(y);
  }, Ze = () => {
    o.transform((l) => ({ ...ae(l, !0), version: null, publish: !1, published_at: null })), o.put(y, { preserveScroll: !0 });
  }, $ = a.useEditLock({
    type: "cms.entry",
    id: t?.id,
    locale: t?.locale,
    enabled: t !== null && ge,
    noun: s("entry"),
    leaveTo: K,
    getUnsaved: () => o.isDirty ? { title: o.data.title, slug: o.data.slug, data: o.data.data, seo: o.data.seo, terms: o.data.terms } : null
  }), D = ge && !$.readOnly, es = async (l) => {
    const v = await $.loadKept(l);
    o.setData((T) => ({ ...T, title: v.title ?? T.title, slug: v.slug ?? T.slug, data: v.data ?? T.data, seo: v.seo ?? T.seo, terms: v.terms ?? T.terms }));
  };
  a.useUnsavedChanges(o.isDirty && !$.takenOver, D ? () => o.processing || ne() : void 0);
  const ss = () => {
    const l = () => b.router.post(`${y}/review`, O, { preserveScroll: !0 });
    o.isDirty ? (o.transform((v) => ({ ...ae(v), publish: !1, published_at: null })), o.put(y, { preserveScroll: !0, onSuccess: l })) : l();
  }, X = (l = null) => {
    w.update ? ne(!0, l) : t && b.router.post(`${y}/publish`, { ...O, published_at: l }, { preserveScroll: !0, onSuccess: () => H(!1) });
  };
  return /* @__PURE__ */ e.jsxs("form", { noValidate: !0, onSubmit: (l) => {
    l.preventDefault(), ne();
  }, className: "cms:flex cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(b.Head, { title: ee }),
    Ye,
    $.dialogs,
    /* @__PURE__ */ e.jsxs(
      a.PageHeader,
      {
        title: ee,
        back: { href: K, label: s("Back to :title", { title: n.title }) },
        actions: /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          t?.trashed && w.delete && /* @__PURE__ */ e.jsxs(a.Button, { type: "button", variant: "outline", onClick: () => b.router.post(`${y}/restore`, {}, { preserveScroll: !0 }), children: [
            /* @__PURE__ */ e.jsx(Ds, {}),
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
                s(`Permanently delete ":title" in every language, with its revisions? This can't be undone.`, { title: c.title }) + ye(m),
                () => b.router.delete(`${y}/force`, { data: m.length > 0 ? { force: 1 } : {} })
              ),
              children: [
                /* @__PURE__ */ e.jsx(ve, {}),
                " ",
                s("Permanently delete")
              ]
            }
          ),
          t && !t.trashed && (Q || w.create || w.delete && !$.readOnly || D && j !== null || q || oe.length > 0) && /* @__PURE__ */ e.jsxs(a.DropdownMenu, { children: [
            /* @__PURE__ */ e.jsx(a.DropdownMenuTrigger, { asChild: !0, children: /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "outline", size: "icon", "aria-label": s("More actions"), children: /* @__PURE__ */ e.jsx(Ms, {}) }) }),
            /* @__PURE__ */ e.jsxs(a.DropdownMenuContent, { align: "end", className: "cms:min-w-52", children: [
              D && j !== null && /* @__PURE__ */ e.jsxs(
                a.DropdownMenuItem,
                {
                  disabled: o.processing || o.isDirty,
                  title: o.isDirty ? void 0 : s("Fill in what isn't translated yet, into the draft"),
                  onSelect: () => b.router.post(M(`cms/entries/${t.id}/translations/${t.locale}/translate`), { version: t.version }, { preserveScroll: !0 }),
                  children: [
                    /* @__PURE__ */ e.jsx(Ne, {}),
                    " ",
                    o.isDirty ? s("Save to translate") : s("Translate from :language", { language: r.find((l) => l.main)?.name ?? (_ ? U(_) : s("the main language")) })
                  ]
                }
              ),
              Q && /* @__PURE__ */ e.jsxs(a.DropdownMenuItem, { title: s("A link that shows the saved draft to anyone, without signing in, for a while"), onSelect: () => pe(!0), children: [
                /* @__PURE__ */ e.jsx($s, {}),
                " ",
                s("Share preview link…")
              ] }),
              w.create && /* @__PURE__ */ e.jsxs(a.DropdownMenuItem, { title: s("Copy every language as a new draft"), onSelect: () => b.router.post(`${y}/duplicate`), children: [
                /* @__PURE__ */ e.jsx(Le, {}),
                " ",
                s("Duplicate")
              ] }),
              q && /* @__PURE__ */ e.jsx(a.DropdownMenuItem, { asChild: !0, children: /* @__PURE__ */ e.jsxs(b.Link, { href: q, children: [
                /* @__PURE__ */ e.jsx(Ts, {}),
                " ",
                s("Edit blueprint")
              ] }) }),
              oe.map((l) => /* @__PURE__ */ e.jsx(a.DropdownMenuItem, { asChild: !0, children: /^https?:\/\//i.test(l.href) ? /* @__PURE__ */ e.jsxs("a", { href: l.href, children: [
                /* @__PURE__ */ e.jsx(ke, {}),
                " ",
                l.label
              ] }) : /* @__PURE__ */ e.jsxs(b.Link, { href: l.href, children: [
                /* @__PURE__ */ e.jsx(ke, {}),
                " ",
                l.label
              ] }) }, l.href)),
              w.delete && !$.readOnly && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
                /* @__PURE__ */ e.jsx(a.DropdownMenuSeparator, {}),
                /* @__PURE__ */ e.jsxs(
                  a.DropdownMenuItem,
                  {
                    className: "cms:text-destructive",
                    onSelect: () => I(s('Move ":title" to the trash? It comes off the site; you can restore it.', { title: c.title }) + ye(m), () => b.router.delete(y), s("Move to trash")),
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
              /* @__PURE__ */ e.jsx(Ne, {}),
              " ",
              s("Translate from :language", { language: r.find((l) => l.main)?.name ?? (_ ? U(_) : s("the main language")) })
            ] }),
            /* @__PURE__ */ e.jsx("span", { id: "machine-translate-missing", className: "cms:sr-only", children: s("Machine translation isn't set up on this site: ask your developer.") })
          ] }),
          D && /* @__PURE__ */ e.jsxs(a.Button, { type: "submit", variant: t ? "outline" : "default", disabled: o.processing, children: [
            o.processing && /* @__PURE__ */ e.jsx(Ee, { className: "cms:animate-spin" }),
            t ? s("Save draft") : s("Create draft")
          ] }),
          t && !t.trashed && D && !w.publish && (t.status === "draft" || t.hasUnpublishedChanges || o.isDirty) && /* @__PURE__ */ e.jsxs(
            a.Button,
            {
              type: "button",
              disabled: o.processing,
              onClick: ss,
              title: t.review ? s("Already sent; sending again tells them again") : s("Ask those who can publish to review it"),
              children: [
                /* @__PURE__ */ e.jsx(Ls, {}),
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
              E && /* @__PURE__ */ e.jsx(Be, { className: "cms:text-emerald-600 cms:dark:text-emerald-400" }),
              E ? s("Published") : J.action === "schedule" ? s("Schedule") : J.action === "backdate" ? s("Publish now, back-dated") : B === "offline" ? s("Publish again") : t.status === "draft" ? s("Publish") : s("Publish changes")
            ] }),
            /* @__PURE__ */ e.jsxs(a.DropdownMenu, { children: [
              /* @__PURE__ */ e.jsx(a.DropdownMenuTrigger, { asChild: !0, children: /* @__PURE__ */ e.jsx(a.Button, { type: "button", size: "icon", variant: E ? "outline" : "default", className: E ? "cms:-ml-px cms:rounded-l-none" : "cms:rounded-l-none cms:border-l cms:border-primary-foreground/20", "aria-label": s("More publishing options"), children: /* @__PURE__ */ e.jsx(ks, {}) }) }),
              /* @__PURE__ */ e.jsxs(a.DropdownMenuContent, { align: "end", children: [
                /* @__PURE__ */ e.jsxs(a.DropdownMenuItem, { onSelect: () => H(!0), children: [
                  /* @__PURE__ */ e.jsx(ce, {}),
                  " ",
                  Y ? s("Change the date…") : s("Publish on a date…")
                ] }),
                Y && /* @__PURE__ */ e.jsx(a.DropdownMenuItem, { onSelect: () => X((/* @__PURE__ */ new Date()).toISOString()), children: s("Publish now") }),
                t.status !== "draft" && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
                  /* @__PURE__ */ e.jsx(a.DropdownMenuSeparator, {}),
                  /* @__PURE__ */ e.jsx(a.DropdownMenuItem, { onSelect: () => b.router.post(`${y}/unpublish`, O, { preserveScroll: !0 }), children: Y ? s("Unschedule (back to draft)") : s("Unpublish") })
                ] })
              ] })
            ] })
          ] })
        ] }),
        children: [
          t && (t.trashed ? /* @__PURE__ */ e.jsx(a.Badge, { variant: "secondary", children: s("In the trash") }) : /* @__PURE__ */ e.jsx(we, { status: t.status, changes: t.status !== "draft" && t.hasUnpublishedChanges })),
          t?.review && !t.trashed && /* @__PURE__ */ e.jsx(a.Badge, { variant: "warning", title: t.review.by ? s(":name sent it on :date", { name: t.review.by, date: S(t.review.requestedAt) }) : s("Sent on :date", { date: S(t.review.requestedAt) }), children: s("Waiting for review") })
        ]
      }
    ),
    t && B && /* @__PURE__ */ e.jsx(
      Gs,
      {
        state: B,
        entry: t,
        dirty: o.isDirty,
        actions: ns(B, { liveUrl: t.url !== null, pages: Q, canUpdate: D }),
        onCompare: () => he(!0),
        onDiscard: () => I(
          s(`Discard the unpublished changes to ":title"? The editor goes back to the live version, as visitors see it. This can't be undone.`, { title: c.title }) + (o.isDirty ? ` ${s("Your unsaved edits are lost too.")}` : ""),
          () => b.router.post(M(`cms/entries/${t.id}/translations/${t.locale}/discard`), { version: t.version }, { preserveScroll: !0 }),
          s("Discard changes")
        )
      }
    ),
    t && r.length > 1 && /* @__PURE__ */ e.jsx(
      Us,
      {
        entryUrl: y,
        editUrl: `${K}/${t.id}/edit`,
        current: t.locale,
        locales: r,
        canAdd: (w.create || w.translate === !0) && !t.trashed,
        canRemove: w.delete && !t.isMain && !t.trashed,
        onRemove: () => I(
          s('Remove the :language translation of ":title"? Its revisions go with it.', { language: U(t.locale), title: c.title }),
          () => b.router.delete(`${y}/translations/${t.locale}`)
        )
      }
    ),
    /* @__PURE__ */ e.jsx(a.ViewingNotice, { by: $.viewingBy, onTakeOver: $.requestTakeOver }),
    /* @__PURE__ */ e.jsx(a.KeptEditsNotice, { kept: $.kept, disabled: !D, onLoad: (l) => {
      es(l);
    }, onDiscard: (l) => {
      $.discardKept(l);
    } }),
    C.version && /* @__PURE__ */ e.jsxs("div", { role: "alert", className: "cms:flex cms:flex-wrap cms:items-center cms:justify-between cms:gap-3 cms:rounded-lg cms:border cms:border-destructive cms:p-3 cms:text-sm cms:text-destructive", children: [
      /* @__PURE__ */ e.jsx("span", { children: C.version }),
      /* @__PURE__ */ e.jsxs("span", { className: "cms:flex cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "outline", size: "sm", onClick: () => b.router.reload(), children: s("Load theirs") }),
        /* @__PURE__ */ e.jsx(
          a.Button,
          {
            type: "button",
            variant: "destructive",
            size: "sm",
            disabled: o.processing,
            onClick: () => I(s("Save your version over theirs? Their changes are replaced (their earlier published versions stay in the revisions)."), Ze),
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
              fe("title")
            ] }),
            /* @__PURE__ */ e.jsx(
              a.Input,
              {
                id: "title",
                value: o.data.title,
                "aria-invalid": C.title !== void 0,
                onChange: (l) => {
                  const v = l.target.value;
                  o.setData((T) => ({ ...T, title: v, slug: is(T.slug, T.title, v, t !== null && t.publishedAt === null && t.status === "draft") })), V("title");
                }
              }
            ),
            /* @__PURE__ */ e.jsx(P, { message: C.title })
          ] }),
          /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
            /* @__PURE__ */ e.jsxs(a.Label, { htmlFor: "slug", children: [
              s("Slug"),
              fe("slug")
            ] }),
            /* @__PURE__ */ e.jsx(
              a.Input,
              {
                id: "slug",
                className: "cms:font-mono",
                value: o.data.slug,
                placeholder: s("Made from the title"),
                "aria-invalid": C.slug !== void 0,
                onChange: (l) => {
                  o.setData("slug", l.target.value), V("slug");
                }
              }
            ),
            /* @__PURE__ */ e.jsx(ws, { note: rs(t?.publishedSlug, o.data.slug, t !== null && t.status !== "draft"), redirectsUrl: qe }),
            /* @__PURE__ */ e.jsx(P, { message: C.slug })
          ] })
        ] }) }) }),
        /* @__PURE__ */ e.jsx(_e.Provider, { value: le, children: /* @__PURE__ */ e.jsx(
          js,
          {
            disabled: !D,
            fields: i,
            values: o.data.data,
            errors: C,
            storageKey: `cms:entry:${n.handle}`,
            shared: d,
            sharedValues: h,
            changed: W,
            mainLanguage: r.find((l) => l.main)?.name ?? (_ ? U(_) : null),
            onChange: (l, v) => {
              o.setData("data", { ...o.data.data, [l]: v }), V(`data.${l}`);
            }
          }
        ) }),
        /* @__PURE__ */ e.jsx(a.CollapsibleCard, { title: W.some((l) => l.startsWith("seo.")) ? /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          s("SEO"),
          /* @__PURE__ */ e.jsx(Z, {})
        ] }) : s("SEO"), description: s("How this entry appears in search results and shared links."), titleClassName: "cms:text-base", storageKey: "cms:entry:seo", hasErrors: Ss(C, "seo"), children: /* @__PURE__ */ e.jsx("fieldset", { disabled: !D, className: "cms:min-w-0", children: /* @__PURE__ */ e.jsx(
          Ns,
          {
            bare: !0,
            id: "seo",
            fields: us(),
            value: o.data.seo,
            errors: Cs(C, "seo"),
            onChange: (l) => {
              o.setData("seo", l), V("seo");
            }
          }
        ) }) })
      ] }),
      !t && (n.hierarchical || g.length > 0) && /* @__PURE__ */ e.jsxs("aside", { className: "cms:flex cms:min-w-0 cms:flex-col cms:gap-4", children: [
        n.hierarchical && /* @__PURE__ */ e.jsx(a.CollapsibleCard, { title: "Page settings", titleClassName: "cms:text-base", storageKey: "cms:entry:page-settings", hasErrors: C.parent_id !== void 0, children: /* @__PURE__ */ e.jsx("fieldset", { disabled: !D, className: "cms:flex cms:min-w-0 cms:flex-col cms:gap-4 cms:text-sm", children: /* @__PURE__ */ e.jsx(Ue, { collection: n, value: o.data.parent_id, error: C.parent_id, onChange: (l) => xe({ parent_id: l }) }) }) }),
        /* @__PURE__ */ e.jsx(
          Ae,
          {
            taxonomies: g,
            value: o.data.terms,
            labels: le,
            errors: C,
            changed: W,
            disabled: !D || w.terms !== !0,
            onChange: (l, v) => {
              o.setData("terms", { ...o.data.terms, [l]: v }), V(`terms.${l}`);
            }
          }
        )
      ] }),
      t && /* @__PURE__ */ e.jsxs("aside", { className: "cms:flex cms:min-w-0 cms:flex-col cms:gap-4", children: [
        /* @__PURE__ */ e.jsxs(a.CollapsibleCard, { title: s("Status"), titleClassName: "cms:text-base", storageKey: "cms:entry:status", contentClassName: "cms:flex cms:flex-col cms:gap-3 cms:text-sm", children: [
          /* @__PURE__ */ e.jsxs("dl", { className: "cms:flex cms:flex-col cms:gap-2", children: [
            /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:justify-between cms:gap-3", children: [
              /* @__PURE__ */ e.jsx("dt", { className: "cms:text-muted-foreground", children: s("Status") }),
              /* @__PURE__ */ e.jsx("dd", { className: "cms:flex cms:flex-wrap cms:justify-end cms:gap-1", children: t.trashed ? /* @__PURE__ */ e.jsx(a.Badge, { variant: "secondary", children: s("In the trash") }) : /* @__PURE__ */ e.jsx(we, { status: t.status, changes: t.status !== "draft" && t.hasUnpublishedChanges }) })
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
                onClick: () => b.router.post(`${y}/review/withdraw`, O, { preserveScroll: !0 }),
                children: s("Withdraw the request")
              }
            )
          ] }),
          !t.trashed && w.publish && !$.readOnly && /* @__PURE__ */ e.jsx(
            qs,
            {
              status: t.status,
              value: de,
              onChange: me,
              dated: J,
              processing: o.processing,
              onPublish: (l) => X(l),
              onUnpublish: () => b.router.post(`${y}/unpublish`, O, { preserveScroll: !0 })
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
                (z.current ? s('Make ":title" the homepage? Visitors to / will see it instead of ":current".', { title: c.title, current: z.current }) : s('Make ":title" the homepage? Visitors to / will see it.', { title: c.title })) + " " + s("Its own address will lead to / as well."),
                () => b.router.post(`${y}/homepage`, {}, { preserveScroll: !0 }),
                s("Make this the homepage")
              ),
              children: s("Make this the homepage")
            }
          ),
          r.find((l) => l.code === t.locale)?.outdated && /* @__PURE__ */ e.jsx("p", { className: "cms:text-amber-700 cms:dark:text-amber-400", children: _ ? s("The :language version changed since this translation was last saved.", { language: U(_) }) : s("The main version changed since this translation was last saved.") })
        ] }),
        /* @__PURE__ */ e.jsxs(a.CollapsibleCard, { title: s("Used by"), titleClassName: "cms:text-base", storageKey: "cms:entry:used-by", contentClassName: "cms:flex cms:flex-col cms:gap-1 cms:text-sm", children: [
          m.length === 0 && /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: s("No other content links here.") }),
          m.map((l) => /* @__PURE__ */ e.jsxs("div", { className: "cms:min-w-0", children: [
            l.url ? /* @__PURE__ */ e.jsx("a", { href: l.url, className: "cms:block cms:truncate cms:underline-offset-4 cms:hover:underline", children: l.label }) : /* @__PURE__ */ e.jsx("span", { className: "cms:block cms:truncate", children: l.label }),
            /* @__PURE__ */ e.jsx("span", { className: "cms:text-xs cms:text-muted-foreground", title: l.field, children: l.fieldLabel ?? l.field })
          ] }, `${l.label}:${l.field}`))
        ] }),
        A && /* @__PURE__ */ e.jsx(
          Qs,
          {
            entryUrl: y,
            collection: n,
            settings: A,
            templates: hs(Ke, He),
            blueprints: L,
            disabled: !D,
            values: o.data,
            errors: C,
            onChange: xe,
            draftDirty: o.isDirty,
            commentCount: p ? p.counts.pending + p.counts.approved : null
          }
        ),
        /* @__PURE__ */ e.jsx(
          Ae,
          {
            taxonomies: g,
            value: o.data.terms,
            labels: le,
            errors: C,
            changed: W,
            disabled: !D || w.terms !== !0,
            onChange: (l, v) => {
              o.setData("terms", { ...o.data.terms, [l]: v }), V(`terms.${l}`);
            }
          }
        ),
        p !== null && n.comments && /* @__PURE__ */ e.jsx(zs, { entryId: t.id, comments: p }),
        /* @__PURE__ */ e.jsxs(a.CollapsibleCard, { title: s("Revisions"), titleClassName: "cms:text-base", storageKey: "cms:entry:revisions", contentClassName: "cms:flex cms:flex-col cms:gap-2 cms:text-sm", children: [
          f !== null && w.update && /* @__PURE__ */ e.jsxs(a.Button, { type: "button", variant: "outline", size: "sm", onClick: () => b.router.post(M(`cms/entries/${t.id}/translations/${t.locale}/undo-restore`), {}, { preserveScroll: !0 }), children: [
            /* @__PURE__ */ e.jsx(re, {}),
            " ",
            s("Undo the restore")
          ] }),
          /* @__PURE__ */ e.jsx(b.Deferred, { data: "revisions", fallback: /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
            /* @__PURE__ */ e.jsx(a.Skeleton, { className: "cms:h-8" }),
            /* @__PURE__ */ e.jsx(a.Skeleton, { className: "cms:h-8" })
          ] }), children: /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
            (x ?? []).length === 0 && /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: s("Each publish keeps one.") }),
            (x ?? []).map((l) => /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-1 cms:border-b cms:border-border/60 cms:pb-2 cms:last:border-b-0 cms:last:pb-0", children: [
              /* @__PURE__ */ e.jsxs("div", { className: "cms:min-w-0", children: [
                /* @__PURE__ */ e.jsx("div", { className: "cms:truncate", children: l.title }),
                /* @__PURE__ */ e.jsxs("div", { className: "cms:text-xs cms:text-muted-foreground", children: [
                  S(l.createdAt),
                  l.author ? ` · ${l.author}` : ""
                ] }),
                /* @__PURE__ */ e.jsx("div", { className: "cms:text-xs cms:text-muted-foreground", children: l.changed === null ? s("First kept version") : l.changed.length === 0 ? s("No field changed") : s("Changed: :fields", { fields: l.changed.join(", ") }) })
              ] }),
              /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:gap-1", children: [
                /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "ghost", size: "sm", onClick: () => ue(l), children: s("Compare") }),
                w.update && !t.trashed && /* @__PURE__ */ e.jsx(
                  a.Button,
                  {
                    type: "button",
                    variant: "ghost",
                    size: "sm",
                    onClick: () => b.router.post(M(`cms/entries/${t.id}/revisions/${l.id}/restore`), {}, { preserveScroll: !0 }),
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
      Vs,
      {
        open: Qe,
        onClose: () => te(!1),
        by: t.review.by,
        onSend: (l, v) => b.router.post(`${y}/review/send-back`, { ...O, note: l }, { preserveScroll: !0, onSuccess: () => {
          te(!1), v();
        }, onError: v })
      }
    ),
    t && B && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
      /* @__PURE__ */ e.jsx(
        Te,
        {
          open: Ge,
          onClose: () => he(!1),
          dirty: o.isDirty,
          url: M(`cms/entries/${t.id}/translations/${t.locale}/compare-live`),
          read: (l) => ({ label: String(l.label), old: String(l.live ?? ""), new: String(l.draft ?? "") }),
          title: s("Your changes compared with the live version"),
          description: s("What visitors see, beside your saved changes. Removed words are struck through, added ones highlighted."),
          oldLabel: Hs(t.live),
          newLabel: s("Your changes (not published)"),
          same: s("Your changes are the same as the live version.")
        }
      ),
      /* @__PURE__ */ e.jsx(
        Te,
        {
          open: R !== null,
          onClose: () => ue(null),
          dirty: o.isDirty,
          url: R ? M(`cms/entries/${t.id}/revisions/${R.id}/compare`) : null,
          read: (l) => ({ label: String(l.label), old: String(l.revision ?? ""), new: String(l.draft ?? "") }),
          title: s("Version of :date compared with :current", { date: S(R?.createdAt), current: De(B) }),
          description: s("A version published earlier, beside :current. Removed words are struck through, added ones highlighted.", { current: De(B) }),
          oldLabel: R ? Ys(R) : "",
          newLabel: Ws(B),
          same: s("The two versions are the same.")
        }
      ),
      Q && /* @__PURE__ */ e.jsx(Js, { open: Je, onClose: () => pe(!1), url: t.previewUrl, expiresAt: t.previewExpiresAt ?? null })
    ] }),
    /* @__PURE__ */ e.jsx(
      Ks,
      {
        open: We,
        onClose: () => H(!1),
        processing: o.processing,
        rescheduling: Y,
        current: t?.publishedAt ?? null,
        onSchedule: (l) => X(l)
      }
    )
  ] });
}
function Vs({ open: n, onClose: i, by: r, onSend: d }) {
  const [h, t] = k.useState(""), [c, x] = k.useState(!1), p = b.usePage().props.errors ?? {};
  return k.useEffect(() => {
    n && t("");
  }, [n]), /* @__PURE__ */ e.jsx(a.Dialog, { open: n, onOpenChange: (u) => !u && !c && i(), children: /* @__PURE__ */ e.jsxs(a.DialogContent, { children: [
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
      /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "outline", disabled: c, onClick: i, children: s("Cancel") }),
      /* @__PURE__ */ e.jsxs(a.Button, { type: "button", disabled: c, onClick: () => {
        x(!0), d(h, () => x(!1));
      }, children: [
        c && /* @__PURE__ */ e.jsx(Ee, { className: "cms:animate-spin" }),
        " ",
        s("Send back")
      ] })
    ] })
  ] }) });
}
function Us({ entryUrl: n, editUrl: i, current: r, locales: d, canAdd: h, canRemove: t, onRemove: c }) {
  return /* @__PURE__ */ e.jsx(
    a.LanguageTabs,
    {
      value: r,
      languages: vs(d, h, s, ds, U),
      onValueChange: (x) => b.router.get(i, { locale: x }),
      onAdd: (x) => b.router.post(`${n}/translations`, { locale: x }),
      actions: t ? /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "ghost", size: "sm", className: "cms:text-destructive", onClick: c, children: s("Remove this language") }) : void 0
    }
  );
}
function qs({ status: n, value: i, onChange: r, dated: d, processing: h, onPublish: t, onUnpublish: c }) {
  const x = d.action !== "now", p = {
    now: s("Publish"),
    schedule: n === "scheduled" ? s("Reschedule") : s("Schedule"),
    backdate: s("Publish now, back-dated"),
    redate: s("Change date")
  }[d.action];
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2 cms:border-t cms:border-border/60 cms:pt-3", children: [
    /* @__PURE__ */ e.jsx(a.Label, { htmlFor: "entry-published-at", children: s("Publish date") }),
    /* @__PURE__ */ e.jsx(a.DatePicker, { id: "entry-published-at", withTime: !0, className: "cms:max-w-none", value: i || null, onChange: (u) => r(u ?? "") }),
    /* @__PURE__ */ e.jsx("p", { className: "cms:text-xs cms:text-muted-foreground", children: n === "draft" ? s("Empty: now. A date in the future schedules it.") : s("The date shown as published. A date in the future takes it off the site until then.") }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:gap-2", children: [
      (n === "draft" || x) && /* @__PURE__ */ e.jsxs(a.Button, { type: "button", size: "sm", disabled: h, onClick: () => t(d.at), children: [
        /* @__PURE__ */ e.jsx(ce, {}),
        " ",
        p
      ] }),
      n !== "draft" && /* @__PURE__ */ e.jsx(a.Button, { type: "button", size: "sm", variant: "outline", disabled: h, onClick: c, children: s("Unpublish") })
    ] })
  ] });
}
function Ks({ open: n, onClose: i, onSchedule: r, current: d, processing: h, rescheduling: t }) {
  const [c, x] = k.useState("");
  k.useEffect(() => {
    n && x(Me(cs(d)));
  }, [n, d]);
  const p = c === "" ? null : new Date(c), u = p !== null && p.getTime() <= Date.now();
  return /* @__PURE__ */ e.jsx(a.Dialog, { open: n, onOpenChange: (m) => !m && i(), children: /* @__PURE__ */ e.jsxs(a.DialogContent, { children: [
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
      /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "outline", onClick: i, children: s("Cancel") }),
      /* @__PURE__ */ e.jsx(a.Button, { type: "button", disabled: p === null || h, onClick: () => p && r(p.toISOString()), children: u ? s("Publish now, back-dated") : t ? s("Change the date") : s("Schedule") })
    ] })
  ] }) });
}
function Hs(n) {
  return n?.publishedAt ? n.by ? s("Live (published :date by :name)", { date: S(n.publishedAt), name: n.by }) : s("Live (published :date)", { date: S(n.publishedAt) }) : s("Live");
}
function Ys(n) {
  return n.author ? s("Version of :date by :name", { date: S(n.createdAt), name: n.author }) : s("Version of :date", { date: S(n.createdAt) });
}
function Ws(n) {
  return n === "live" ? s("Live") : n === "scheduled" ? s("Published (scheduled)") : n === "draft" || n === "trashed" ? s("Draft (not published)") : s("Your changes (not published)");
}
function De(n) {
  return n === "live" ? s("the live version") : n === "scheduled" ? s("the scheduled version") : n === "draft" || n === "trashed" ? s("the draft") : s("your changes");
}
function Gs({ state: n, entry: i, dirty: r, actions: d, onCompare: h, onDiscard: t }) {
  const c = i.live, x = c?.publishedAt ? c.by ? s("the version published on :date by :name", { date: S(c.publishedAt), name: c.by }) : s("the version published on :date", { date: S(c.publishedAt) }) : s("the version last published"), p = {
    draft: { title: s("Not published yet"), text: s("Only people who can edit see it."), tone: "muted" },
    offline: { title: s("Taken off the site"), text: s("Only people who can edit see it."), tone: "muted" },
    scheduled: { title: s("Scheduled"), text: s("Goes live on :date.", { date: S(i.publishedAt) }), tone: "scheduled" },
    "scheduled-changes": { title: s("Scheduled, with unpublished changes"), text: s("Goes live on :date with :version; your changes since aren't in it.", { date: S(i.publishedAt), version: x }), tone: "pending" },
    live: { title: s("Live"), text: r ? s("Visitors see what was last published.") : s("Visitors see exactly this."), tone: "live" },
    "live-changes": { title: s("Live, with unpublished changes"), text: s("Visitors still see :version.", { version: x }), tone: "pending" },
    trashed: { title: s("In the trash"), text: s("It's off the site. Restore it to edit it again."), tone: "trash" }
  }, { title: u, text: m, tone: f } = p[n], j = { muted: "cms:bg-muted-foreground/50", live: "cms:bg-emerald-500", pending: "cms:bg-amber-500", scheduled: "cms:bg-sky-500", trash: "cms:bg-destructive" }[f], N = f === "pending" ? "cms:border-amber-500/40 cms:bg-amber-500/5" : f === "live" ? "cms:border-emerald-500/30 cms:bg-emerald-500/5" : "cms:border-border cms:bg-card", A = os(n);
  return /* @__PURE__ */ e.jsxs(
    "section",
    {
      "aria-label": s("Publishing status"),
      "data-state": n,
      className: `cms:flex cms:flex-col cms:gap-3 cms:rounded-lg cms:border cms:px-4 cms:py-3 cms:md:flex-row cms:md:items-center cms:md:justify-between ${N}`,
      children: [
        /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:min-w-0 cms:items-start cms:gap-3", children: [
          /* @__PURE__ */ e.jsx("span", { "aria-hidden": !0, className: `cms:mt-1.5 cms:size-2.5 cms:shrink-0 cms:rounded-full ${j}` }),
          /* @__PURE__ */ e.jsxs("div", { className: "cms:min-w-0 cms:text-sm", children: [
            /* @__PURE__ */ e.jsx("p", { className: "cms:font-medium", children: u }),
            /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: m }),
            r && /* @__PURE__ */ e.jsx("p", { className: "cms:text-amber-700 cms:dark:text-amber-400", children: s("You have unsaved edits.") })
          ] })
        ] }),
        (d.viewLive || d.compare || d.preview || d.discard) && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:gap-2 cms:md:justify-end", children: [
          d.viewLive && i.url && /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "outline", size: "sm", asChild: !0, children: /* @__PURE__ */ e.jsxs("a", { href: i.url, target: "_blank", rel: "noopener noreferrer", children: [
            /* @__PURE__ */ e.jsx(As, {}),
            " ",
            s("View live page")
          ] }) }),
          d.compare && /* @__PURE__ */ e.jsxs(a.Button, { type: "button", variant: "outline", size: "sm", onClick: h, children: [
            /* @__PURE__ */ e.jsx(Bs, {}),
            " ",
            s("Compare with live")
          ] }),
          d.preview && /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "outline", size: "sm", asChild: !0, children: /* @__PURE__ */ e.jsxs(
            "a",
            {
              href: i.previewUrl,
              target: "_blank",
              rel: "noopener noreferrer",
              title: r ? s("Shows what's saved: save first to see your unsaved edits.") : s("Shows what's saved, as visitors would see it once published."),
              children: [
                /* @__PURE__ */ e.jsx(_s, {}),
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
function $e({ old: n, next: i, side: r }) {
  if ((r === "old" ? n : i).trim() === "") return /* @__PURE__ */ e.jsx("span", { className: "cms:text-muted-foreground cms:italic", children: s("(empty)") });
  const h = Fs(Ps(n, i), r);
  return /* @__PURE__ */ e.jsx(e.Fragment, { children: h.map((t, c) => t.op === "same" ? /* @__PURE__ */ e.jsx(k.Fragment, { children: t.text }, c) : t.op === "removed" ? /* @__PURE__ */ e.jsx("del", { className: "cms:rounded-sm cms:bg-red-500/15 cms:text-red-900 cms:decoration-red-500/60 cms:dark:text-red-200", children: t.text }, c) : /* @__PURE__ */ e.jsx("ins", { className: "cms:rounded-sm cms:bg-emerald-500/20 cms:text-emerald-900 cms:no-underline cms:dark:text-emerald-200", children: t.text }, c)) });
}
function Te({ open: n, url: i, read: r, title: d, description: h, oldLabel: t, newLabel: c, same: x, onClose: p, dirty: u }) {
  const [m, f] = k.useState(null), [j, N] = k.useState(!1), A = k.useRef(r);
  return A.current = r, k.useEffect(() => {
    if (f(null), N(!1), !n || !i) return;
    let g = !0;
    return fetch(i, { headers: { Accept: "application/json" }, credentials: "same-origin" }).then((L) => L.ok ? L.json() : Promise.reject(new Error(String(L.status)))).then((L) => {
      g && f(L.fields.map((q) => A.current(q)));
    }).catch(() => {
      g && N(!0);
    }), () => {
      g = !1;
    };
  }, [n, i]), /* @__PURE__ */ e.jsx(a.Dialog, { open: n, onOpenChange: (g) => !g && p(), children: /* @__PURE__ */ e.jsxs(a.DialogContent, { className: "cms:max-h-[85vh] cms:overflow-y-auto cms:sm:max-w-3xl", children: [
    /* @__PURE__ */ e.jsxs(a.DialogHeader, { children: [
      /* @__PURE__ */ e.jsx(a.DialogTitle, { children: d }),
      /* @__PURE__ */ e.jsxs(a.DialogDescription, { children: [
        h,
        u ? ` ${s("Your unsaved edits aren't included.")}` : ""
      ] })
    ] }),
    j && /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-destructive", children: s("The comparison could not be loaded. Try again.") }),
    !j && m === null && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
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
            /* @__PURE__ */ e.jsx($e, { old: g.old, next: g.new, side: "old" })
          ] }),
          /* @__PURE__ */ e.jsxs("div", { className: "cms:rounded-md cms:border cms:bg-muted/30 cms:p-2 cms:break-words cms:whitespace-pre-wrap", children: [
            /* @__PURE__ */ e.jsx("span", { className: "cms:block cms:text-xs cms:text-muted-foreground cms:sm:sr-only", children: c }),
            /* @__PURE__ */ e.jsx($e, { old: g.old, next: g.new, side: "new" })
          ] })
        ] })
      ] }, g.label)) })
    ] }),
    /* @__PURE__ */ e.jsx(a.DialogFooter, { children: /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "outline", onClick: p, children: s("Close") }) })
  ] }) });
}
function Js({ open: n, onClose: i, url: r, expiresAt: d }) {
  const h = () => {
    navigator.clipboard?.writeText(r).then(() => a.toast.success(s("Link copied.")), () => a.toast.error(s("Couldn't copy: select the link and copy it.")));
  };
  return /* @__PURE__ */ e.jsx(a.Dialog, { open: n, onOpenChange: (t) => !t && i(), children: /* @__PURE__ */ e.jsxs(a.DialogContent, { children: [
    /* @__PURE__ */ e.jsxs(a.DialogHeader, { children: [
      /* @__PURE__ */ e.jsx(a.DialogTitle, { children: s("Share preview link") }),
      /* @__PURE__ */ e.jsx(a.DialogDescription, { children: s("Anyone with this link sees what's saved, as the page would look published, without signing in. Visitors of the site don't see it.") })
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
      /* @__PURE__ */ e.jsx(a.Label, { htmlFor: "preview-link", children: s("Preview link") }),
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(a.Input, { id: "preview-link", readOnly: !0, value: r, className: "cms:font-mono cms:text-xs", onFocus: (t) => t.target.select() }),
        /* @__PURE__ */ e.jsxs(a.Button, { type: "button", variant: "outline", onClick: h, children: [
          /* @__PURE__ */ e.jsx(Le, {}),
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
    /* @__PURE__ */ e.jsx(a.DialogFooter, { children: /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "outline", onClick: i, children: s("Close") }) })
  ] }) });
}
function Ue({ collection: n, value: i, error: r, onChange: d }) {
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:min-w-0 cms:flex-col cms:gap-2", children: [
    /* @__PURE__ */ e.jsx(a.Label, { htmlFor: "parent", children: s("Parent") }),
    /* @__PURE__ */ e.jsx(
      gs,
      {
        id: "parent",
        multiple: !1,
        max: 1,
        collections: [n.handle],
        invalid: r !== void 0,
        value: i,
        onChange: (h) => d(typeof h == "number" ? h : null)
      }
    ),
    /* @__PURE__ */ e.jsx(P, { message: r })
  ] });
}
function Qs({ entryUrl: n, collection: i, settings: r, templates: d, blueprints: h, disabled: t, values: c, errors: x, onChange: p, draftDirty: u, commentCount: m = null }) {
  const f = h.length > 1 ? r.blueprint ?? h[0].handle : void 0, j = b.useForm({ blueprint: f ?? "" }), N = j.errors.blueprint, A = ["parent_id", "template", "comments_closed"].some((g) => x[g] !== void 0) || N !== void 0;
  return /* @__PURE__ */ e.jsx(a.CollapsibleCard, { title: s("Page settings"), titleClassName: "cms:text-base", storageKey: "cms:entry:page-settings", hasErrors: A, children: /* @__PURE__ */ e.jsxs("fieldset", { disabled: t, className: "cms:flex cms:min-w-0 cms:flex-col cms:gap-4 cms:text-sm", children: [
    i.hierarchical && /* @__PURE__ */ e.jsx(Ue, { collection: i, value: c.parent_id, error: x.parent_id, onChange: (g) => p({ parent_id: g }) }),
    h.length > 1 && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
      /* @__PURE__ */ e.jsx(a.Label, { htmlFor: "blueprint", children: s("Blueprint") }),
      /* @__PURE__ */ e.jsxs(a.Select, { value: j.data.blueprint, onValueChange: (g) => j.setData("blueprint", g), children: [
        /* @__PURE__ */ e.jsx(a.SelectTrigger, { id: "blueprint", className: "cms:w-full cms:min-w-0", "aria-invalid": N !== void 0, children: /* @__PURE__ */ e.jsx(a.SelectValue, {}) }),
        /* @__PURE__ */ e.jsx(a.SelectContent, { children: h.map((g) => /* @__PURE__ */ e.jsx(a.SelectItem, { value: g.handle, children: g.title }, g.handle)) })
      ] }),
      j.data.blueprint !== f && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
        /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: s("The fields change in every language. Values of fields the new blueprint doesn't have stay saved and come back if you switch back. The editor reloads.") }),
        /* @__PURE__ */ e.jsx(
          a.Button,
          {
            type: "button",
            size: "sm",
            className: "cms:w-fit",
            disabled: j.processing || u,
            "aria-describedby": u ? "blueprint-save-first" : void 0,
            onClick: () => j.put(`${n}/settings`, { preserveScroll: !0 }),
            children: s("Change blueprint")
          }
        ),
        u && /* @__PURE__ */ e.jsx("p", { id: "blueprint-save-first", className: "cms:text-xs cms:text-amber-700 cms:dark:text-amber-400", children: s("Save your draft first.") })
      ] }),
      /* @__PURE__ */ e.jsx(P, { message: N })
    ] }),
    /* @__PURE__ */ e.jsx(
      ps,
      {
        id: "template",
        value: c.template,
        onChange: (g) => p({ template: g }),
        lookup: d,
        example: `cms.${i.handle}-landing`,
        automatic: s("Automatic uses the collection's template."),
        error: x.template,
        disabled: t
      }
    ),
    i.comments && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-1 cms:border-t cms:border-border/60 cms:pt-4", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:justify-between cms:gap-3", children: [
        /* @__PURE__ */ e.jsx(a.Label, { htmlFor: "comments-open", className: "cms:whitespace-nowrap", children: s("Accept new comments") }),
        /* @__PURE__ */ e.jsx(a.Switch, { id: "comments-open", checked: !c.comments_closed, onCheckedChange: (g) => p({ comments_closed: !g }) })
      ] }),
      /* @__PURE__ */ e.jsx("a", { href: M(`cms/comments?entry=${n.split("/").slice(-1)[0]}`), className: "cms:w-fit cms:text-xs cms:text-muted-foreground cms:underline-offset-4 cms:hover:text-foreground cms:hover:underline", children: m === null ? s("View comments") : s("View comments (:count)", { count: m }) })
    ] })
  ] }) });
}
function Ae({ taxonomies: n, value: i, labels: r, errors: d, changed: h, disabled: t, onChange: c }) {
  if (n.length === 0) return null;
  const x = h.some((u) => u.startsWith("terms.")), p = d.terms !== void 0 || n.some((u) => d[`terms.${u.handle}`] !== void 0);
  return /* @__PURE__ */ e.jsx(a.CollapsibleCard, { title: x ? /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    s("Taxonomies"),
    /* @__PURE__ */ e.jsx(Z, {})
  ] }) : s("Taxonomies"), titleClassName: "cms:text-base", storageKey: "cms:entry:taxonomies", hasErrors: p, children: /* @__PURE__ */ e.jsx(_e.Provider, { value: r, children: /* @__PURE__ */ e.jsxs("fieldset", { disabled: t, className: "cms:flex cms:min-w-0 cms:flex-col cms:gap-4 cms:text-sm", children: [
    n.map((u) => {
      const m = `terms-${u.handle}`, f = i[u.handle] ?? [], j = d[`terms.${u.handle}`];
      return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:min-w-0 cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsxs(a.Label, { htmlFor: m, children: [
          u.title,
          h.includes(`terms.${u.handle}`) && /* @__PURE__ */ e.jsx(Z, {})
        ] }),
        /* @__PURE__ */ e.jsx(
          xs,
          {
            id: m,
            taxonomy: u.handle,
            multiple: !u.single,
            max: null,
            required: !1,
            invalid: j !== void 0,
            value: u.single ? f[0] ?? null : f,
            onChange: (N) => c(u.handle, N === null ? [] : Array.isArray(N) ? N : [N])
          }
        ),
        u.single && /* @__PURE__ */ e.jsx("p", { className: "cms:text-xs cms:text-muted-foreground", children: s("One term only.") }),
        /* @__PURE__ */ e.jsx(P, { message: j })
      ] }, u.handle);
    }),
    /* @__PURE__ */ e.jsx(P, { message: d.terms })
  ] }) }) });
}
export {
  vt as default
};
