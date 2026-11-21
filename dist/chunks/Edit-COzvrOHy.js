import { j as e, t as s, f as N, a as _, r as b, b as _e, d as is, e as rs, l as U, c as cs, g as os, h as ds, i as ms, k as us, s as hs } from "./admin-DkIqfqBq.js";
import { c as F, _ as k, u as a } from "./ui-BzV6lfEf.js";
import { u as ps, T as we } from "./Confirm-BRP6X1LK.js";
import { s as xs, w as gs, T as fs } from "./seo-CtVeRRqc.js";
import { E as ke, a as Pe, C as ee, T as bs } from "./TermsPicker-452bv0Vc.js";
import { E as js } from "./EntriesPicker-C3AbSIBJ.js";
import { C as Be } from "./check-Cvm5ZpBE.js";
import { S as vs, M as ws, U as ce } from "./undo-2-B1yF9-es.js";
import { F as ks, e as Cs } from "./languages-D0jdK__0.js";
import { S as Ns, P as Ss } from "./PluginCards-CXheCpNA.js";
import { F as E } from "./FieldError-D3x0EZGt.js";
import { C as ys, z as Ds, b as $s, h as Ts, A as As } from "./FieldInput-DPcVWCtH.js";
import { R as Ms } from "./rotate-ccw-BxpZ9siY.js";
import { L as _s } from "./link-2-HefnCw8K.js";
import { C as Le } from "./copy-D11fpdhs.js";
import { L as Ps } from "./layout-template-Btp-VVsS.js";
import { L as Ee } from "./loader-circle-CjVcQmAV.js";
import { E as Bs } from "./external-link-Mqd1ZxLN.js";
const Fe = {
  name: "arrow-right",
  size: 24,
  node: [
    ["path", { d: "M5 12h14", key: "1ays0h" }],
    ["path", { d: "m12 5 7 7-7 7", key: "xquz4c" }]
  ]
};
Fe.node;
const Ce = F(Fe);
const ze = {
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
ze.node;
const oe = F(ze);
const Ie = {
  name: "ellipsis-vertical",
  size: 24,
  node: [
    ["circle", { cx: "12", cy: "12", r: "1", key: "41hilf" }],
    ["circle", { cx: "12", cy: "5", r: "1", key: "gxeob9" }],
    ["circle", { cx: "12", cy: "19", r: "1", key: "lyex9k" }]
  ],
  aliases: ["more-vertical"]
};
Ie.node;
const Ls = F(Ie);
const Re = {
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
Re.node;
const Es = F(Re);
const Oe = {
  name: "git-compare",
  size: 24,
  node: [
    ["circle", { cx: "18", cy: "18", r: "3", key: "1xkwt0" }],
    ["circle", { cx: "6", cy: "6", r: "3", key: "1lh9wr" }],
    ["path", { d: "M13 6h3a2 2 0 0 1 2 2v7", key: "1yeb86" }],
    ["path", { d: "M11 18H8a2 2 0 0 1-2-2V9", key: "19pyzm" }]
  ]
};
Oe.node;
const Fs = F(Oe);
const Ve = {
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
Ve.node;
const Ne = F(Ve);
const Ue = {
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
Ue.node;
const zs = F(Ue);
function Se(n) {
  return n.match(/\n|[^\s]+[^\S\n]*|[^\S\n]+/g) ?? [];
}
const Is = 25e4;
function Rs(n, i) {
  if (n === i) return n === "" ? [] : [{ text: n, op: "same" }];
  const r = Se(n), d = Se(i);
  if (r.length * d.length > Is)
    return [...n ? [{ text: n, op: "removed" }] : [], ...i ? [{ text: i, op: "added" }] : []];
  const u = r.length + 1, t = d.length + 1, c = new Uint32Array(u * t);
  for (let h = r.length - 1; h >= 0; h--)
    for (let j = d.length - 1; j >= 0; j--)
      c[h * t + j] = r[h].trimEnd() === d[j].trimEnd() ? c[(h + 1) * t + j + 1] + 1 : Math.max(c[(h + 1) * t + j], c[h * t + j + 1]);
  const g = [], p = (h, j) => {
    const y = g[g.length - 1];
    y && y.op === j ? y.text += h : g.push({ text: h, op: j });
  };
  let f = 0, m = 0;
  for (; f < r.length && m < d.length; )
    r[f].trimEnd() === d[m].trimEnd() ? (p(d[m], "same"), f++, m++) : c[(f + 1) * t + m] >= c[f * t + m + 1] ? p(r[f++], "removed") : p(d[m++], "added");
  for (; f < r.length; ) p(r[f++], "removed");
  for (; m < d.length; ) p(d[m++], "added");
  return g;
}
function Os(n, i) {
  return n.filter((r) => r.op === "same" || r.op === (i === "old" ? "removed" : "added"));
}
const ye = { preserveScroll: !0, preserveState: !0 };
function Vs({ entryId: n, comments: i }) {
  const [r, d] = k.useState(null), [u, t] = k.useState(""), [c, g] = k.useState(!1), p = (m, h) => b.router.post(_(`cms/comments/${m}/status`), { status: h }, ye), f = (m) => b.router.post(_(`cms/comments/${m}/reply`), { body: u }, {
    ...ye,
    onStart: () => g(!0),
    onFinish: () => g(!1),
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
            N(m.createdAt),
            m.reply ? ` · ${s("a reply")}` : ""
          ] }),
          i.canModerate && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:gap-1", children: [
            m.status === "pending" && /* @__PURE__ */ e.jsxs(a.Button, { type: "button", variant: "outline", size: "sm", onClick: () => p(m.id, "approved"), children: [
              /* @__PURE__ */ e.jsx(Be, {}),
              " ",
              s("Approve")
            ] }),
            /* @__PURE__ */ e.jsxs(a.Button, { type: "button", variant: "ghost", size: "sm", onClick: () => p(m.id, "spam"), children: [
              /* @__PURE__ */ e.jsx(vs, {}),
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
                  /* @__PURE__ */ e.jsx(ws, {}),
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
                value: u,
                onChange: (h) => t(h.target.value)
              }
            ),
            /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:gap-2", children: [
              /* @__PURE__ */ e.jsx(a.Button, { type: "button", size: "sm", disabled: u.trim() === "" || c, onClick: () => f(m.id), children: s("Post reply") }),
              /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "ghost", size: "sm", onClick: () => d(null), children: s("Cancel") })
            ] })
          ] })
        ] }, m.id)),
        /* @__PURE__ */ e.jsx("a", { href: _(`cms/comments?entry=${n}`), className: "cms:text-sm cms:font-medium cms:underline-offset-4 cms:hover:underline", children: s("All comments on this entry") })
      ] }) : /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(a.Skeleton, { className: "cms:h-10" }),
        /* @__PURE__ */ e.jsx(a.Skeleton, { className: "cms:h-10" })
      ] })
    }
  );
}
function Us(n, i) {
  const r = new Set(n), d = new Set(i);
  return r.size === d.size && [...r].every((u) => d.has(u));
}
function qs(n, i) {
  const r = {}, d = {};
  for (const [u, t] of Object.entries(i)) {
    const c = n[u] ?? [];
    Us(c, t) || (r[u] = t.slice(), d[u] = c.slice());
  }
  return Object.keys(r).length === 0 ? null : { terms: r, terms_base: d };
}
function De(n) {
  if (n.length === 0) return "";
  const i = n.slice(0, 5).map((r) => r.label).join("; ");
  return ` ${n.length > 5 ? s("It's used by :list and :count more: those links will show nothing.", { list: i, count: n.length - 5 }) : s("It's used by :list: those links will show nothing.", { list: i })}`;
}
function Ct(n) {
  const { entry: i } = n;
  return /* @__PURE__ */ e.jsx(Ks, { ...n }, i ? `${i.id}:${i.locale}:${i.version}:${i.status}:${i.trashed}:${i.publishedAt}` : "new");
}
function Ks({ collection: n, fields: i, locales: r = [], shared: d = [], sharedValues: u = {}, entry: t, values: c, revisions: g, comments: p, termLabels: f, usedBy: m = [], undoRestore: h = null, machineTranslate: j = null, machineTranslateMissing: y = !1, settings: D, taxonomies: x = [], blueprints: M = [], blueprintUrl: q = null, homepage: z, redirectsUrl: Ke = null, templates: He = null, templateChoices: Ye, links: de = [], cards: We = [], can: w }) {
  const K = _(`cms/collections/${n.handle}/entries`), S = t ? _(`cms/entries/${t.id}`) : K, { cmsEditor: Ge } = b.usePage().props, G = Ge?.entry, se = t ? c.title : G?.create ?? s("New entry");
  a.useBreadcrumbs([{ label: n.title, href: K }, { label: se }]);
  const [I, Je] = ps(), [Qe, H] = k.useState(!1), te = t?.publishedAt ? _e(new Date(t.publishedAt)) : "", [me, ue] = k.useState(te);
  k.useEffect(() => ue(te), [te]);
  const [R, he] = k.useState(null), [Xe, pe] = k.useState(!1), [Ze, xe] = k.useState(!1), [es, ae] = k.useState(!1), o = b.useForm({
    ...c,
    seo: c.seo ?? {},
    terms: Array.isArray(c.terms) || !c.terms ? {} : c.terms,
    locale: t?.locale ?? null,
    version: t?.version ?? null,
    publish: !1,
    published_at: null,
    parent_id: D?.parentId ?? null,
    template: D?.template ?? "",
    comments_closed: D?.commentsClosed === !0
  }), ge = (l) => o.setData((v) => ({ ...v, ...l })), O = t ? { locale: t.locale } : {}, P = r.find((l) => l.main)?.code, C = o.errors, J = b.usePage().props.errors ?? {}, V = (l) => {
    const v = As(C, l);
    v.length > 0 && o.clearErrors(...v);
  }, L = t !== null && t.status !== "draft" && !t.hasUnpublishedChanges && !o.isDirty, Q = is(t?.status ?? "draft", me, t?.publishedAt ?? null), fe = t === null ? w.create : w.update && !t.trashed, Y = t?.status === "scheduled", B = t ? rs(t) : null, W = t?.live?.changed ?? [], be = (l) => W.includes(l) ? /* @__PURE__ */ e.jsx(ee, {}) : null, X = n.pages !== !1, ss = Array.isArray(c.terms) || !c.terms ? {} : c.terms, le = (l, v = !1) => {
    const { terms: A, ...je } = l, re = w.terms === !0 && x.length > 0 ? qs(ss, A) : null, ve = re === null ? je : { ...je, terms: re.terms, ...v ? {} : { terms_base: re.terms_base } };
    if (D || t === null) return ve;
    const { parent_id: tt, template: at, comments_closed: lt, ...ns } = ve;
    return ns;
  }, ne = Array.isArray(f) || !f ? {} : f, ie = (l = !1, v = null) => {
    o.transform((A) => ({ ...le(A), publish: l, published_at: v })), t ? o.put(S, { preserveScroll: !0, onSuccess: () => H(!1) }) : o.post(S);
  }, ts = () => {
    o.transform((l) => ({ ...le(l, !0), version: null, publish: !1, published_at: null })), o.put(S, { preserveScroll: !0 });
  }, T = a.useEditLock({
    type: "cms.entry",
    id: t?.id,
    locale: t?.locale,
    enabled: t !== null && fe,
    noun: s("entry"),
    leaveTo: K,
    getUnsaved: () => o.isDirty ? { title: o.data.title, slug: o.data.slug, data: o.data.data, seo: o.data.seo, terms: o.data.terms } : null
  }), $ = fe && !T.readOnly, as = async (l) => {
    const v = await T.loadKept(l);
    o.setData((A) => ({ ...A, title: v.title ?? A.title, slug: v.slug ?? A.slug, data: v.data ?? A.data, seo: v.seo ?? A.seo, terms: v.terms ?? A.terms }));
  };
  a.useUnsavedChanges(o.isDirty && !T.takenOver, $ ? () => o.processing || ie() : void 0);
  const ls = () => {
    const l = () => b.router.post(`${S}/review`, O, { preserveScroll: !0 });
    o.isDirty ? (o.transform((v) => ({ ...le(v), publish: !1, published_at: null })), o.put(S, { preserveScroll: !0, onSuccess: l })) : l();
  }, Z = (l = null) => {
    w.update ? ie(!0, l) : t && b.router.post(`${S}/publish`, { ...O, published_at: l }, { preserveScroll: !0, onSuccess: () => H(!1) });
  };
  return /* @__PURE__ */ e.jsxs("form", { noValidate: !0, onSubmit: (l) => {
    l.preventDefault(), ie();
  }, className: "cms:flex cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(b.Head, { title: se }),
    Je,
    T.dialogs,
    /* @__PURE__ */ e.jsxs(
      a.PageHeader,
      {
        title: se,
        back: { href: K, label: s("Back to :title", { title: n.title }) },
        actions: /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          t?.trashed && w.delete && /* @__PURE__ */ e.jsxs(a.Button, { type: "button", variant: "outline", onClick: () => b.router.post(`${S}/restore`, {}, { preserveScroll: !0 }), children: [
            /* @__PURE__ */ e.jsx(Ms, {}),
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
                s(`Permanently delete ":title" in every language, with its revisions? This can't be undone.`, { title: c.title }) + De(m),
                () => b.router.delete(`${S}/force`, { data: m.length > 0 ? { force: 1 } : {} })
              ),
              children: [
                /* @__PURE__ */ e.jsx(we, {}),
                " ",
                s("Permanently delete")
              ]
            }
          ),
          t && !t.trashed && (X || w.create || w.delete && !T.readOnly || $ && j !== null || q || de.length > 0) && /* @__PURE__ */ e.jsxs(a.DropdownMenu, { children: [
            /* @__PURE__ */ e.jsx(a.DropdownMenuTrigger, { asChild: !0, children: /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "outline", size: "icon", "aria-label": s("More actions"), children: /* @__PURE__ */ e.jsx(Ls, {}) }) }),
            /* @__PURE__ */ e.jsxs(a.DropdownMenuContent, { align: "end", className: "cms:min-w-52", children: [
              $ && j !== null && /* @__PURE__ */ e.jsxs(
                a.DropdownMenuItem,
                {
                  disabled: o.processing || o.isDirty,
                  title: o.isDirty ? void 0 : s("Fill in what isn't translated yet, into the draft"),
                  onSelect: () => b.router.post(_(`cms/entries/${t.id}/translations/${t.locale}/translate`), { version: t.version }, { preserveScroll: !0 }),
                  children: [
                    /* @__PURE__ */ e.jsx(Ne, {}),
                    " ",
                    o.isDirty ? s("Save to translate") : s("Translate from :language", { language: r.find((l) => l.main)?.name ?? (P ? U(P) : s("the main language")) })
                  ]
                }
              ),
              X && /* @__PURE__ */ e.jsxs(a.DropdownMenuItem, { title: s("A link that shows the saved draft to anyone, without signing in, for a while"), onSelect: () => xe(!0), children: [
                /* @__PURE__ */ e.jsx(_s, {}),
                " ",
                s("Share preview link…")
              ] }),
              w.create && /* @__PURE__ */ e.jsxs(a.DropdownMenuItem, { title: s("Copy every language as a new draft"), onSelect: () => b.router.post(`${S}/duplicate`), children: [
                /* @__PURE__ */ e.jsx(Le, {}),
                " ",
                s("Duplicate")
              ] }),
              q && /* @__PURE__ */ e.jsx(a.DropdownMenuItem, { asChild: !0, children: /* @__PURE__ */ e.jsxs(b.Link, { href: q, children: [
                /* @__PURE__ */ e.jsx(Ps, {}),
                " ",
                s("Edit blueprint")
              ] }) }),
              de.map((l) => /* @__PURE__ */ e.jsx(a.DropdownMenuItem, { asChild: !0, children: /^https?:\/\//i.test(l.href) ? /* @__PURE__ */ e.jsxs("a", { href: l.href, children: [
                /* @__PURE__ */ e.jsx(Ce, {}),
                " ",
                l.label
              ] }) : /* @__PURE__ */ e.jsxs(b.Link, { href: l.href, children: [
                /* @__PURE__ */ e.jsx(Ce, {}),
                " ",
                l.label
              ] }) }, l.href)),
              w.delete && !T.readOnly && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
                /* @__PURE__ */ e.jsx(a.DropdownMenuSeparator, {}),
                /* @__PURE__ */ e.jsxs(
                  a.DropdownMenuItem,
                  {
                    className: "cms:text-destructive",
                    onSelect: () => I(s('Move ":title" to the trash? It comes off the site; you can restore it.', { title: c.title }) + De(m), () => b.router.delete(S), s("Move to trash")),
                    children: [
                      /* @__PURE__ */ e.jsx(we, {}),
                      " ",
                      s("Move to trash")
                    ]
                  }
                )
              ] })
            ] })
          ] }),
          t && $ && y && /* @__PURE__ */ e.jsxs("span", { title: s("Machine translation isn't set up on this site: ask your developer (SUNRICE_TRANSLATE_DRIVER, see Help → Developer docs → Machine translation)."), children: [
            /* @__PURE__ */ e.jsxs(a.Button, { type: "button", variant: "outline", disabled: !0, "aria-describedby": "machine-translate-missing", children: [
              /* @__PURE__ */ e.jsx(Ne, {}),
              " ",
              s("Translate from :language", { language: r.find((l) => l.main)?.name ?? (P ? U(P) : s("the main language")) })
            ] }),
            /* @__PURE__ */ e.jsx("span", { id: "machine-translate-missing", className: "cms:sr-only", children: s("Machine translation isn't set up on this site: ask your developer.") })
          ] }),
          $ && /* @__PURE__ */ e.jsxs(a.Button, { type: "submit", variant: t ? "outline" : "default", disabled: o.processing, children: [
            o.processing && /* @__PURE__ */ e.jsx(Ee, { className: "cms:animate-spin" }),
            G?.save ?? (t ? s("Save draft") : s("Create draft"))
          ] }),
          t && !t.trashed && $ && !w.publish && (t.status === "draft" || t.hasUnpublishedChanges || o.isDirty) && /* @__PURE__ */ e.jsxs(
            a.Button,
            {
              type: "button",
              disabled: o.processing,
              onClick: ls,
              title: t.review ? s("Already sent; sending again tells them again") : s("Ask those who can publish to review it"),
              children: [
                /* @__PURE__ */ e.jsx(zs, {}),
                " ",
                t.review ? s("Send for review again") : s("Submit for review")
              ]
            }
          ),
          t && !t.trashed && w.publish && !T.readOnly && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex", children: [
            Y && L ? /* @__PURE__ */ e.jsxs(a.Button, { type: "button", variant: "outline", className: "cms:rounded-r-none", disabled: o.processing, title: s("Change the date"), onClick: () => H(!0), children: [
              /* @__PURE__ */ e.jsx(oe, {}),
              " ",
              s("Scheduled for :date", { date: N(t.publishedAt) })
            ] }) : /* @__PURE__ */ e.jsxs(a.Button, { type: "button", variant: L ? "outline" : "default", className: "cms:rounded-r-none cms:disabled:opacity-100", disabled: o.processing || L, onClick: () => Z(Q.at), children: [
              L && /* @__PURE__ */ e.jsx(Be, { className: "cms:text-emerald-600 cms:dark:text-emerald-400" }),
              L ? s("Published") : Q.action === "schedule" ? s("Schedule") : Q.action === "backdate" ? s("Publish now, back-dated") : B === "offline" ? s("Publish again") : t.status === "draft" ? s("Publish") : s("Publish changes")
            ] }),
            /* @__PURE__ */ e.jsxs(a.DropdownMenu, { children: [
              /* @__PURE__ */ e.jsx(a.DropdownMenuTrigger, { asChild: !0, children: /* @__PURE__ */ e.jsx(a.Button, { type: "button", size: "icon", variant: L ? "outline" : "default", className: L ? "cms:-ml-px cms:rounded-l-none" : "cms:rounded-l-none cms:border-l cms:border-primary-foreground/20", "aria-label": s("More publishing options"), children: /* @__PURE__ */ e.jsx(ys, {}) }) }),
              /* @__PURE__ */ e.jsxs(a.DropdownMenuContent, { align: "end", children: [
                /* @__PURE__ */ e.jsxs(a.DropdownMenuItem, { onSelect: () => H(!0), children: [
                  /* @__PURE__ */ e.jsx(oe, {}),
                  " ",
                  Y ? s("Change the date…") : s("Publish on a date…")
                ] }),
                Y && /* @__PURE__ */ e.jsx(a.DropdownMenuItem, { onSelect: () => Z((/* @__PURE__ */ new Date()).toISOString()), children: s("Publish now") }),
                t.status !== "draft" && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
                  /* @__PURE__ */ e.jsx(a.DropdownMenuSeparator, {}),
                  /* @__PURE__ */ e.jsx(a.DropdownMenuItem, { onSelect: () => b.router.post(`${S}/unpublish`, O, { preserveScroll: !0 }), children: Y ? s("Unschedule (back to draft)") : s("Unpublish") })
                ] })
              ] })
            ] })
          ] })
        ] }),
        children: [
          t && (t.trashed ? /* @__PURE__ */ e.jsx(a.Badge, { variant: "secondary", children: s("In the trash") }) : /* @__PURE__ */ e.jsx(ke, { status: t.status, changes: t.status !== "draft" && t.hasUnpublishedChanges })),
          t?.review && !t.trashed && /* @__PURE__ */ e.jsx(a.Badge, { variant: "warning", title: t.review.by ? s(":name sent it on :date", { name: t.review.by, date: N(t.review.requestedAt) }) : s("Sent on :date", { date: N(t.review.requestedAt) }), children: s("Waiting for review") })
        ]
      }
    ),
    t && B && /* @__PURE__ */ e.jsx(
      Zs,
      {
        state: B,
        entry: t,
        dirty: o.isDirty,
        actions: cs(B, { liveUrl: t.url !== null, pages: X, canUpdate: $ }),
        onCompare: () => pe(!0),
        onDiscard: () => I(
          s(`Discard the unpublished changes to ":title"? The editor goes back to the live version, as visitors see it. This can't be undone.`, { title: c.title }) + (o.isDirty ? ` ${s("Your unsaved edits are lost too.")}` : ""),
          () => b.router.post(_(`cms/entries/${t.id}/translations/${t.locale}/discard`), { version: t.version }, { preserveScroll: !0 }),
          s("Discard changes")
        )
      }
    ),
    t && r.length > 1 && /* @__PURE__ */ e.jsx(
      Ys,
      {
        entryUrl: S,
        editUrl: `${K}/${t.id}/edit`,
        current: t.locale,
        locales: r,
        canAdd: (w.create || w.translate === !0) && !t.trashed,
        canRemove: w.delete && !t.isMain && !t.trashed,
        onRemove: () => I(
          s('Remove the :language translation of ":title"? Its revisions go with it.', { language: U(t.locale), title: c.title }),
          () => b.router.delete(`${S}/translations/${t.locale}`)
        )
      }
    ),
    /* @__PURE__ */ e.jsx(a.ViewingNotice, { by: T.viewingBy, onTakeOver: T.requestTakeOver }),
    /* @__PURE__ */ e.jsx(a.KeptEditsNotice, { kept: T.kept, disabled: !$, onLoad: (l) => {
      as(l);
    }, onDiscard: (l) => {
      T.discardKept(l);
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
            onClick: () => I(s("Save your version over theirs? Their changes are replaced (their earlier published versions stay in the revisions)."), ts),
            children: s("Save mine anyway")
          }
        )
      ] })
    ] }),
    (C.entry || C.published_at || J.published_at || J.homepage) && /* @__PURE__ */ e.jsx("p", { role: "alert", className: "cms:text-sm cms:text-destructive", children: C.entry ?? C.published_at ?? J.published_at ?? J.homepage }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:grid cms:gap-6 cms:lg:grid-cols-[minmax(0,1fr)_18rem]", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:min-w-0 cms:flex-col cms:gap-6", children: [
        /* @__PURE__ */ e.jsx(a.Card, { children: /* @__PURE__ */ e.jsx(a.CardContent, { children: /* @__PURE__ */ e.jsxs("fieldset", { disabled: !$, className: "cms:grid cms:gap-4 cms:md:grid-cols-[2fr_1fr]", children: [
          /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
            /* @__PURE__ */ e.jsxs(a.Label, { htmlFor: "title", children: [
              s("Title"),
              be("title")
            ] }),
            /* @__PURE__ */ e.jsx(
              a.Input,
              {
                id: "title",
                dir: "auto",
                value: o.data.title,
                "aria-invalid": C.title !== void 0,
                onChange: (l) => {
                  const v = l.target.value;
                  o.setData((A) => ({ ...A, title: v, slug: os(A.slug, A.title, v, t !== null && t.publishedAt === null && t.status === "draft") })), V("title");
                }
              }
            ),
            /* @__PURE__ */ e.jsx(E, { message: C.title })
          ] }),
          /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
            /* @__PURE__ */ e.jsxs(a.Label, { htmlFor: "slug", children: [
              s("Slug"),
              be("slug")
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
            /* @__PURE__ */ e.jsx(Ns, { note: ds(t?.publishedSlug, o.data.slug, t !== null && t.status !== "draft"), redirectsUrl: Ke }),
            /* @__PURE__ */ e.jsx(E, { message: C.slug })
          ] })
        ] }) }) }),
        /* @__PURE__ */ e.jsx(Pe.Provider, { value: ne, children: /* @__PURE__ */ e.jsx(
          ks,
          {
            disabled: !$,
            fields: i,
            values: o.data.data,
            errors: C,
            storageKey: `cms:entry:${n.handle}`,
            shared: d,
            sharedValues: u,
            changed: W,
            mainLanguage: r.find((l) => l.main)?.name ?? (P ? U(P) : null),
            onChange: (l, v) => {
              o.setData("data", { ...o.data.data, [l]: v }), V(`data.${l}`);
            }
          }
        ) }),
        /* @__PURE__ */ e.jsx(a.CollapsibleCard, { title: W.some((l) => l.startsWith("seo.")) ? /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          s("SEO"),
          /* @__PURE__ */ e.jsx(ee, {})
        ] }) : s("SEO"), description: s("How this entry appears in search results and shared links."), titleClassName: "cms:text-base", storageKey: "cms:entry:seo", hasErrors: Ts(C, "seo"), children: /* @__PURE__ */ e.jsx("fieldset", { disabled: !$, className: "cms:min-w-0", children: /* @__PURE__ */ e.jsx(
          Ds,
          {
            bare: !0,
            id: "seo",
            fields: xs(),
            value: o.data.seo,
            errors: $s(C, "seo"),
            onChange: (l) => {
              o.setData("seo", l), V("seo");
            }
          }
        ) }) })
      ] }),
      !t && (n.hierarchical || x.length > 0) && /* @__PURE__ */ e.jsxs("aside", { className: "cms:flex cms:min-w-0 cms:flex-col cms:gap-4", children: [
        n.hierarchical && /* @__PURE__ */ e.jsx(a.CollapsibleCard, { title: "Page settings", titleClassName: "cms:text-base", storageKey: "cms:entry:page-settings", hasErrors: C.parent_id !== void 0, children: /* @__PURE__ */ e.jsx("fieldset", { disabled: !$, className: "cms:flex cms:min-w-0 cms:flex-col cms:gap-4 cms:text-sm", children: /* @__PURE__ */ e.jsx(qe, { collection: n, value: o.data.parent_id, error: C.parent_id, onChange: (l) => ge({ parent_id: l }) }) }) }),
        /* @__PURE__ */ e.jsx(
          Me,
          {
            presentation: G,
            taxonomies: x,
            value: o.data.terms,
            labels: ne,
            errors: C,
            changed: W,
            disabled: !$ || w.terms !== !0,
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
              /* @__PURE__ */ e.jsx("dd", { className: "cms:flex cms:flex-wrap cms:justify-end cms:gap-1", children: t.trashed ? /* @__PURE__ */ e.jsx(a.Badge, { variant: "secondary", children: s("In the trash") }) : /* @__PURE__ */ e.jsx(ke, { status: t.status, changes: t.status !== "draft" && t.hasUnpublishedChanges }) })
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
          t.review && !t.trashed && (t.review.mine || w.publish && !T.readOnly) && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:gap-2", children: [
            w.publish && !T.readOnly && /* @__PURE__ */ e.jsxs(a.Button, { type: "button", variant: "outline", size: "sm", disabled: o.processing, onClick: () => ae(!0), children: [
              /* @__PURE__ */ e.jsx(ce, {}),
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
                onClick: () => b.router.post(`${S}/review/withdraw`, O, { preserveScroll: !0 }),
                children: s("Withdraw the request")
              }
            )
          ] }),
          !t.trashed && w.publish && !T.readOnly && /* @__PURE__ */ e.jsx(
            Ws,
            {
              status: t.status,
              value: me,
              onChange: ue,
              dated: Q,
              processing: o.processing,
              onPublish: (l) => Z(l),
              onUnpublish: () => b.router.post(`${S}/unpublish`, O, { preserveScroll: !0 })
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
                () => b.router.post(`${S}/homepage`, {}, { preserveScroll: !0 }),
                s("Make this the homepage")
              ),
              children: s("Make this the homepage")
            }
          ),
          r.find((l) => l.code === t.locale)?.outdated && /* @__PURE__ */ e.jsx("p", { className: "cms:text-amber-700 cms:dark:text-amber-400", children: P ? s("The :language version changed since this translation was last saved.", { language: U(P) }) : s("The main version changed since this translation was last saved.") })
        ] }),
        /* @__PURE__ */ e.jsxs(a.CollapsibleCard, { title: s("Used by"), titleClassName: "cms:text-base", storageKey: "cms:entry:used-by", contentClassName: "cms:flex cms:flex-col cms:gap-1 cms:text-sm", children: [
          m.length === 0 && /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: s("No other content links here.") }),
          m.map((l) => /* @__PURE__ */ e.jsxs("div", { className: "cms:min-w-0", children: [
            l.url ? /* @__PURE__ */ e.jsx("a", { href: l.url, className: "cms:block cms:truncate cms:underline-offset-4 cms:hover:underline", children: l.label }) : /* @__PURE__ */ e.jsx("span", { className: "cms:block cms:truncate", children: l.label }),
            /* @__PURE__ */ e.jsx("span", { className: "cms:text-xs cms:text-muted-foreground", title: l.field, children: l.fieldLabel ?? l.field })
          ] }, `${l.label}:${l.field}`))
        ] }),
        D && /* @__PURE__ */ e.jsx(
          st,
          {
            entryUrl: S,
            collection: n,
            settings: D,
            templates: gs(He, Ye),
            blueprints: M,
            disabled: !$,
            values: o.data,
            errors: C,
            onChange: ge,
            draftDirty: o.isDirty,
            commentCount: p ? p.counts.pending + p.counts.approved : null
          }
        ),
        /* @__PURE__ */ e.jsx(Ss, { cards: We, disabled: !$, storageKey: "cms:entry:card" }),
        /* @__PURE__ */ e.jsx(
          Me,
          {
            presentation: G,
            taxonomies: x,
            value: o.data.terms,
            labels: ne,
            errors: C,
            changed: W,
            disabled: !$ || w.terms !== !0,
            onChange: (l, v) => {
              o.setData("terms", { ...o.data.terms, [l]: v }), V(`terms.${l}`);
            }
          }
        ),
        p !== null && n.comments && /* @__PURE__ */ e.jsx(Vs, { entryId: t.id, comments: p }),
        /* @__PURE__ */ e.jsxs(a.CollapsibleCard, { title: s("Revisions"), titleClassName: "cms:text-base", storageKey: "cms:entry:revisions", contentClassName: "cms:flex cms:flex-col cms:gap-2 cms:text-sm", children: [
          h !== null && w.update && /* @__PURE__ */ e.jsxs(a.Button, { type: "button", variant: "outline", size: "sm", onClick: () => b.router.post(_(`cms/entries/${t.id}/translations/${t.locale}/undo-restore`), {}, { preserveScroll: !0 }), children: [
            /* @__PURE__ */ e.jsx(ce, {}),
            " ",
            s("Undo the restore")
          ] }),
          /* @__PURE__ */ e.jsx(b.Deferred, { data: "revisions", fallback: /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
            /* @__PURE__ */ e.jsx(a.Skeleton, { className: "cms:h-8" }),
            /* @__PURE__ */ e.jsx(a.Skeleton, { className: "cms:h-8" })
          ] }), children: /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
            (g ?? []).length === 0 && /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: s("Each publish keeps one.") }),
            (g ?? []).map((l) => /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-1 cms:border-b cms:border-border/60 cms:pb-2 cms:last:border-b-0 cms:last:pb-0", children: [
              /* @__PURE__ */ e.jsxs("div", { className: "cms:min-w-0", children: [
                /* @__PURE__ */ e.jsx("div", { className: "cms:truncate", children: l.title }),
                /* @__PURE__ */ e.jsxs("div", { className: "cms:text-xs cms:text-muted-foreground", children: [
                  N(l.createdAt),
                  l.author ? ` · ${l.author}` : ""
                ] }),
                /* @__PURE__ */ e.jsx("div", { className: "cms:text-xs cms:text-muted-foreground", children: l.changed === null ? s("First kept version") : l.changed.length === 0 ? s("No field changed") : s("Changed: :fields", { fields: l.changed.join(", ") }) })
              ] }),
              /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:gap-1", children: [
                /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "ghost", size: "sm", onClick: () => he(l), children: s("Compare") }),
                w.update && !t.trashed && /* @__PURE__ */ e.jsx(
                  a.Button,
                  {
                    type: "button",
                    variant: "ghost",
                    size: "sm",
                    onClick: () => b.router.post(_(`cms/entries/${t.id}/revisions/${l.id}/restore`), {}, { preserveScroll: !0 }),
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
      Hs,
      {
        open: es,
        onClose: () => ae(!1),
        by: t.review.by,
        onSend: (l, v) => b.router.post(`${S}/review/send-back`, { ...O, note: l }, { preserveScroll: !0, onSuccess: () => {
          ae(!1), v();
        }, onError: v })
      }
    ),
    t && B && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
      /* @__PURE__ */ e.jsx(
        Ae,
        {
          open: Xe,
          onClose: () => pe(!1),
          dirty: o.isDirty,
          url: _(`cms/entries/${t.id}/translations/${t.locale}/compare-live`),
          read: (l) => ({ label: String(l.label), old: String(l.live ?? ""), new: String(l.draft ?? "") }),
          title: s("Your changes compared with the live version"),
          description: s("What visitors see, beside your saved changes. Removed words are struck through, added ones highlighted."),
          oldLabel: Js(t.live),
          newLabel: s("Your changes (not published)"),
          same: s("Your changes are the same as the live version.")
        }
      ),
      /* @__PURE__ */ e.jsx(
        Ae,
        {
          open: R !== null,
          onClose: () => he(null),
          dirty: o.isDirty,
          url: R ? _(`cms/entries/${t.id}/revisions/${R.id}/compare`) : null,
          read: (l) => ({ label: String(l.label), old: String(l.revision ?? ""), new: String(l.draft ?? "") }),
          title: s("Version of :date compared with :current", { date: N(R?.createdAt), current: $e(B) }),
          description: s("A version published earlier, beside :current. Removed words are struck through, added ones highlighted.", { current: $e(B) }),
          oldLabel: R ? Qs(R) : "",
          newLabel: Xs(B),
          same: s("The two versions are the same.")
        }
      ),
      X && /* @__PURE__ */ e.jsx(et, { open: Ze, onClose: () => xe(!1), url: t.previewUrl, expiresAt: t.previewExpiresAt ?? null })
    ] }),
    /* @__PURE__ */ e.jsx(
      Gs,
      {
        open: Qe,
        onClose: () => H(!1),
        processing: o.processing,
        rescheduling: Y,
        current: t?.publishedAt ?? null,
        onSchedule: (l) => Z(l)
      }
    )
  ] });
}
function Hs({ open: n, onClose: i, by: r, onSend: d }) {
  const [u, t] = k.useState(""), [c, g] = k.useState(!1), p = b.usePage().props.errors ?? {};
  return k.useEffect(() => {
    n && t("");
  }, [n]), /* @__PURE__ */ e.jsx(a.Dialog, { open: n, onOpenChange: (f) => !f && !c && i(), children: /* @__PURE__ */ e.jsxs(a.DialogContent, { children: [
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
          value: u,
          placeholder: s("What to change before it can be published"),
          "aria-invalid": p.note !== void 0,
          onChange: (f) => t(f.target.value)
        }
      ),
      /* @__PURE__ */ e.jsx(E, { message: p.note })
    ] }),
    /* @__PURE__ */ e.jsxs(a.DialogFooter, { children: [
      /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "outline", disabled: c, onClick: i, children: s("Cancel") }),
      /* @__PURE__ */ e.jsxs(a.Button, { type: "button", disabled: c, onClick: () => {
        g(!0), d(u, () => g(!1));
      }, children: [
        c && /* @__PURE__ */ e.jsx(Ee, { className: "cms:animate-spin" }),
        " ",
        s("Send back")
      ] })
    ] })
  ] }) });
}
function Ys({ entryUrl: n, editUrl: i, current: r, locales: d, canAdd: u, canRemove: t, onRemove: c }) {
  return /* @__PURE__ */ e.jsx(
    a.LanguageTabs,
    {
      value: r,
      languages: Cs(d, u, s, hs, U),
      onValueChange: (g) => b.router.get(i, { locale: g }),
      onAdd: (g) => b.router.post(`${n}/translations`, { locale: g }),
      actions: t ? /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "ghost", size: "sm", className: "cms:text-destructive", onClick: c, children: s("Remove this language") }) : void 0
    }
  );
}
function Ws({ status: n, value: i, onChange: r, dated: d, processing: u, onPublish: t, onUnpublish: c }) {
  const g = d.action !== "now", p = {
    now: s("Publish"),
    schedule: n === "scheduled" ? s("Reschedule") : s("Schedule"),
    backdate: s("Publish now, back-dated"),
    redate: s("Change date")
  }[d.action];
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2 cms:border-t cms:border-border/60 cms:pt-3", children: [
    /* @__PURE__ */ e.jsx(a.Label, { htmlFor: "entry-published-at", children: s("Publish date") }),
    /* @__PURE__ */ e.jsx(a.DatePicker, { id: "entry-published-at", withTime: !0, className: "cms:max-w-none", value: i || null, onChange: (f) => r(f ?? "") }),
    /* @__PURE__ */ e.jsx("p", { className: "cms:text-xs cms:text-muted-foreground", children: n === "draft" ? s("Empty: now. A date in the future schedules it.") : s("The date shown as published. A date in the future takes it off the site until then.") }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:gap-2", children: [
      (n === "draft" || g) && /* @__PURE__ */ e.jsxs(a.Button, { type: "button", size: "sm", disabled: u, onClick: () => t(d.at), children: [
        /* @__PURE__ */ e.jsx(oe, {}),
        " ",
        p
      ] }),
      n !== "draft" && /* @__PURE__ */ e.jsx(a.Button, { type: "button", size: "sm", variant: "outline", disabled: u, onClick: c, children: s("Unpublish") })
    ] })
  ] });
}
function Gs({ open: n, onClose: i, onSchedule: r, current: d, processing: u, rescheduling: t }) {
  const [c, g] = k.useState("");
  k.useEffect(() => {
    n && g(_e(ms(d)));
  }, [n, d]);
  const p = c === "" ? null : new Date(c), f = p !== null && p.getTime() <= Date.now();
  return /* @__PURE__ */ e.jsx(a.Dialog, { open: n, onOpenChange: (m) => !m && i(), children: /* @__PURE__ */ e.jsxs(a.DialogContent, { children: [
    /* @__PURE__ */ e.jsxs(a.DialogHeader, { children: [
      /* @__PURE__ */ e.jsx(a.DialogTitle, { children: t ? s("Change the publish date") : s("Publish on a date") }),
      /* @__PURE__ */ e.jsx(a.DialogDescription, { children: s("The entry goes live then.") })
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
      /* @__PURE__ */ e.jsx(a.Label, { htmlFor: "published-at", children: s("Date and time") }),
      /* @__PURE__ */ e.jsx(a.DatePicker, { id: "published-at", withTime: !0, required: !0, className: "cms:max-w-none", value: c || null, onChange: (m) => g(m ?? "") }),
      /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: s("In your time zone.") }),
      f && /* @__PURE__ */ e.jsx("p", { role: "alert", className: "cms:text-sm cms:text-amber-700 cms:dark:text-amber-400", children: s("This date has passed: the entry goes live now, dated :date.", { date: N(p.toISOString()) }) })
    ] }),
    /* @__PURE__ */ e.jsxs(a.DialogFooter, { children: [
      /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "outline", onClick: i, children: s("Cancel") }),
      /* @__PURE__ */ e.jsx(a.Button, { type: "button", disabled: p === null || u, onClick: () => p && r(p.toISOString()), children: f ? s("Publish now, back-dated") : t ? s("Change the date") : s("Schedule") })
    ] })
  ] }) });
}
function Js(n) {
  return n?.publishedAt ? n.by ? s("Live (published :date by :name)", { date: N(n.publishedAt), name: n.by }) : s("Live (published :date)", { date: N(n.publishedAt) }) : s("Live");
}
function Qs(n) {
  return n.author ? s("Version of :date by :name", { date: N(n.createdAt), name: n.author }) : s("Version of :date", { date: N(n.createdAt) });
}
function Xs(n) {
  return n === "live" ? s("Live") : n === "scheduled" ? s("Published (scheduled)") : n === "draft" || n === "trashed" ? s("Draft (not published)") : s("Your changes (not published)");
}
function $e(n) {
  return n === "live" ? s("the live version") : n === "scheduled" ? s("the scheduled version") : n === "draft" || n === "trashed" ? s("the draft") : s("your changes");
}
function Zs({ state: n, entry: i, dirty: r, actions: d, onCompare: u, onDiscard: t }) {
  const c = i.live, g = c?.publishedAt ? c.by ? s("the version published on :date by :name", { date: N(c.publishedAt), name: c.by }) : s("the version published on :date", { date: N(c.publishedAt) }) : s("the version last published"), p = {
    draft: { title: s("Not published yet"), text: s("Only people who can edit see it."), tone: "muted" },
    offline: { title: s("Taken off the site"), text: s("Only people who can edit see it."), tone: "muted" },
    scheduled: { title: s("Scheduled"), text: s("Goes live on :date.", { date: N(i.publishedAt) }), tone: "scheduled" },
    "scheduled-changes": { title: s("Scheduled, with unpublished changes"), text: s("Goes live on :date with :version; your changes since aren't in it.", { date: N(i.publishedAt), version: g }), tone: "pending" },
    live: { title: s("Live"), text: r ? s("Visitors see what was last published.") : s("Visitors see exactly this."), tone: "live" },
    "live-changes": { title: s("Live, with unpublished changes"), text: s("Visitors still see :version.", { version: g }), tone: "pending" },
    trashed: { title: s("In the trash"), text: s("It's off the site. Restore it to edit it again."), tone: "trash" }
  }, { title: f, text: m, tone: h } = p[n], j = { muted: "cms:bg-muted-foreground/50", live: "cms:bg-emerald-500", pending: "cms:bg-amber-500", scheduled: "cms:bg-sky-500", trash: "cms:bg-destructive" }[h], y = h === "pending" ? "cms:border-amber-500/40 cms:bg-amber-500/5" : h === "live" ? "cms:border-emerald-500/30 cms:bg-emerald-500/5" : "cms:border-border cms:bg-card", D = us(n);
  return /* @__PURE__ */ e.jsxs(
    "section",
    {
      "aria-label": s("Publishing status"),
      "data-state": n,
      className: `cms:flex cms:flex-col cms:gap-3 cms:rounded-lg cms:border cms:px-4 cms:py-3 cms:md:flex-row cms:md:items-center cms:md:justify-between ${y}`,
      children: [
        /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:min-w-0 cms:items-start cms:gap-3", children: [
          /* @__PURE__ */ e.jsx("span", { "aria-hidden": !0, className: `cms:mt-1.5 cms:size-2.5 cms:shrink-0 cms:rounded-full ${j}` }),
          /* @__PURE__ */ e.jsxs("div", { className: "cms:min-w-0 cms:text-sm", children: [
            /* @__PURE__ */ e.jsx("p", { className: "cms:font-medium", children: f }),
            /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: m }),
            r && /* @__PURE__ */ e.jsx("p", { className: "cms:text-amber-700 cms:dark:text-amber-400", children: s("You have unsaved edits.") })
          ] })
        ] }),
        (d.viewLive || d.compare || d.preview || d.discard) && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:gap-2 cms:md:justify-end", children: [
          d.viewLive && i.url && /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "outline", size: "sm", asChild: !0, children: /* @__PURE__ */ e.jsxs("a", { href: i.url, target: "_blank", rel: "noopener noreferrer", children: [
            /* @__PURE__ */ e.jsx(Bs, {}),
            " ",
            s("View live page")
          ] }) }),
          d.compare && /* @__PURE__ */ e.jsxs(a.Button, { type: "button", variant: "outline", size: "sm", onClick: u, children: [
            /* @__PURE__ */ e.jsx(Fs, {}),
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
                /* @__PURE__ */ e.jsx(Es, {}),
                " ",
                D ? s("Preview changes") : s("Preview")
              ]
            }
          ) }),
          d.discard && /* @__PURE__ */ e.jsxs(a.Button, { type: "button", variant: "ghost", size: "sm", className: "cms:text-destructive", onClick: t, children: [
            /* @__PURE__ */ e.jsx(ce, {}),
            " ",
            s("Discard changes")
          ] })
        ] })
      ]
    }
  );
}
function Te({ old: n, next: i, side: r }) {
  if ((r === "old" ? n : i).trim() === "") return /* @__PURE__ */ e.jsx("span", { className: "cms:text-muted-foreground cms:italic", children: s("(empty)") });
  const u = Os(Rs(n, i), r);
  return /* @__PURE__ */ e.jsx(e.Fragment, { children: u.map((t, c) => t.op === "same" ? /* @__PURE__ */ e.jsx(k.Fragment, { children: t.text }, c) : t.op === "removed" ? /* @__PURE__ */ e.jsx("del", { className: "cms:rounded-sm cms:bg-red-500/15 cms:text-red-900 cms:decoration-red-500/60 cms:dark:text-red-200", children: t.text }, c) : /* @__PURE__ */ e.jsx("ins", { className: "cms:rounded-sm cms:bg-emerald-500/20 cms:text-emerald-900 cms:no-underline cms:dark:text-emerald-200", children: t.text }, c)) });
}
function Ae({ open: n, url: i, read: r, title: d, description: u, oldLabel: t, newLabel: c, same: g, onClose: p, dirty: f }) {
  const [m, h] = k.useState(null), [j, y] = k.useState(!1), D = k.useRef(r);
  return D.current = r, k.useEffect(() => {
    if (h(null), y(!1), !n || !i) return;
    let x = !0;
    return fetch(i, { headers: { Accept: "application/json" }, credentials: "same-origin" }).then((M) => M.ok ? M.json() : Promise.reject(new Error(String(M.status)))).then((M) => {
      x && h(M.fields.map((q) => D.current(q)));
    }).catch(() => {
      x && y(!0);
    }), () => {
      x = !1;
    };
  }, [n, i]), /* @__PURE__ */ e.jsx(a.Dialog, { open: n, onOpenChange: (x) => !x && p(), children: /* @__PURE__ */ e.jsxs(a.DialogContent, { className: "cms:max-h-[85vh] cms:overflow-y-auto cms:sm:max-w-3xl", children: [
    /* @__PURE__ */ e.jsxs(a.DialogHeader, { children: [
      /* @__PURE__ */ e.jsx(a.DialogTitle, { children: d }),
      /* @__PURE__ */ e.jsxs(a.DialogDescription, { children: [
        u,
        f ? ` ${s("Your unsaved edits aren't included.")}` : ""
      ] })
    ] }),
    j && /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-destructive", children: s("The comparison could not be loaded. Try again.") }),
    !j && m === null && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
      /* @__PURE__ */ e.jsx(a.Skeleton, { className: "cms:h-12" }),
      /* @__PURE__ */ e.jsx(a.Skeleton, { className: "cms:h-12" })
    ] }),
    m?.length === 0 && /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: g }),
    m && m.length > 0 && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-4 cms:text-sm", children: [
      /* @__PURE__ */ e.jsxs("div", { "aria-hidden": !0, className: "cms:hidden cms:gap-2 cms:text-xs cms:font-medium cms:text-muted-foreground cms:sm:grid cms:sm:grid-cols-2", children: [
        /* @__PURE__ */ e.jsx("span", { children: t }),
        /* @__PURE__ */ e.jsx("span", { children: c })
      ] }),
      /* @__PURE__ */ e.jsx("dl", { className: "cms:flex cms:flex-col cms:gap-4", children: m.map((x) => /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-1", children: [
        /* @__PURE__ */ e.jsx("dt", { className: "cms:font-medium", children: x.label }),
        /* @__PURE__ */ e.jsxs("dd", { className: "cms:grid cms:gap-2 cms:sm:grid-cols-2", children: [
          /* @__PURE__ */ e.jsxs("div", { className: "cms:rounded-md cms:border cms:bg-muted/30 cms:p-2 cms:break-words cms:whitespace-pre-wrap", children: [
            /* @__PURE__ */ e.jsx("span", { className: "cms:block cms:text-xs cms:text-muted-foreground cms:sm:sr-only", children: t }),
            /* @__PURE__ */ e.jsx(Te, { old: x.old, next: x.new, side: "old" })
          ] }),
          /* @__PURE__ */ e.jsxs("div", { className: "cms:rounded-md cms:border cms:bg-muted/30 cms:p-2 cms:break-words cms:whitespace-pre-wrap", children: [
            /* @__PURE__ */ e.jsx("span", { className: "cms:block cms:text-xs cms:text-muted-foreground cms:sm:sr-only", children: c }),
            /* @__PURE__ */ e.jsx(Te, { old: x.old, next: x.new, side: "new" })
          ] })
        ] })
      ] }, x.label)) })
    ] }),
    /* @__PURE__ */ e.jsx(a.DialogFooter, { children: /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "outline", onClick: p, children: s("Close") }) })
  ] }) });
}
function et({ open: n, onClose: i, url: r, expiresAt: d }) {
  const u = () => {
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
        /* @__PURE__ */ e.jsxs(a.Button, { type: "button", variant: "outline", onClick: u, children: [
          /* @__PURE__ */ e.jsx(Le, {}),
          " ",
          s("Copy")
        ] })
      ] }),
      /* @__PURE__ */ e.jsxs("p", { className: "cms:text-sm cms:text-muted-foreground", children: [
        d ? s("It stops working at :time. Reload the editor for a new one.", { time: N(d) }) : s("It stops working after a while. Reload the editor for a new one."),
        " ",
        s("It shows changes saved after you share it too.")
      ] })
    ] }),
    /* @__PURE__ */ e.jsx(a.DialogFooter, { children: /* @__PURE__ */ e.jsx(a.Button, { type: "button", variant: "outline", onClick: i, children: s("Close") }) })
  ] }) });
}
function qe({ collection: n, value: i, error: r, onChange: d }) {
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:min-w-0 cms:flex-col cms:gap-2", children: [
    /* @__PURE__ */ e.jsx(a.Label, { htmlFor: "parent", children: s("Parent") }),
    /* @__PURE__ */ e.jsx(
      js,
      {
        id: "parent",
        multiple: !1,
        max: 1,
        collections: [n.handle],
        invalid: r !== void 0,
        value: i,
        onChange: (u) => d(typeof u == "number" ? u : null)
      }
    ),
    /* @__PURE__ */ e.jsx(E, { message: r })
  ] });
}
function st({ entryUrl: n, collection: i, settings: r, templates: d, blueprints: u, disabled: t, values: c, errors: g, onChange: p, draftDirty: f, commentCount: m = null }) {
  const h = u.length > 1 ? r.blueprint ?? u[0].handle : void 0, j = b.useForm({ blueprint: h ?? "" }), y = j.errors.blueprint, D = ["parent_id", "template", "comments_closed"].some((x) => g[x] !== void 0) || y !== void 0;
  return /* @__PURE__ */ e.jsx(a.CollapsibleCard, { title: s("Page settings"), titleClassName: "cms:text-base", storageKey: "cms:entry:page-settings", hasErrors: D, children: /* @__PURE__ */ e.jsxs("fieldset", { disabled: t, className: "cms:flex cms:min-w-0 cms:flex-col cms:gap-4 cms:text-sm", children: [
    i.hierarchical && /* @__PURE__ */ e.jsx(qe, { collection: i, value: c.parent_id, error: g.parent_id, onChange: (x) => p({ parent_id: x }) }),
    u.length > 1 && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
      /* @__PURE__ */ e.jsx(a.Label, { htmlFor: "blueprint", children: s("Blueprint") }),
      /* @__PURE__ */ e.jsxs(a.Select, { value: j.data.blueprint, onValueChange: (x) => j.setData("blueprint", x), children: [
        /* @__PURE__ */ e.jsx(a.SelectTrigger, { id: "blueprint", className: "cms:w-full cms:min-w-0", "aria-invalid": y !== void 0, children: /* @__PURE__ */ e.jsx(a.SelectValue, {}) }),
        /* @__PURE__ */ e.jsx(a.SelectContent, { children: u.map((x) => /* @__PURE__ */ e.jsx(a.SelectItem, { value: x.handle, children: x.title }, x.handle)) })
      ] }),
      j.data.blueprint !== h && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
        /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: s("The fields change in every language. Values of fields the new blueprint doesn't have stay saved and come back if you switch back. The editor reloads.") }),
        /* @__PURE__ */ e.jsx(
          a.Button,
          {
            type: "button",
            size: "sm",
            className: "cms:w-fit",
            disabled: j.processing || f,
            "aria-describedby": f ? "blueprint-save-first" : void 0,
            onClick: () => j.put(`${n}/settings`, { preserveScroll: !0 }),
            children: s("Change blueprint")
          }
        ),
        f && /* @__PURE__ */ e.jsx("p", { id: "blueprint-save-first", className: "cms:text-xs cms:text-amber-700 cms:dark:text-amber-400", children: s("Save your draft first.") })
      ] }),
      /* @__PURE__ */ e.jsx(E, { message: y })
    ] }),
    /* @__PURE__ */ e.jsx(
      fs,
      {
        id: "template",
        value: c.template,
        onChange: (x) => p({ template: x }),
        lookup: d,
        example: `cms.${i.handle}-landing`,
        automatic: s("Automatic uses the collection's template."),
        error: g.template,
        disabled: t
      }
    ),
    i.comments && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-1 cms:border-t cms:border-border/60 cms:pt-4", children: [
      /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center cms:justify-between cms:gap-3", children: [
        /* @__PURE__ */ e.jsx(a.Label, { htmlFor: "comments-open", className: "cms:whitespace-nowrap", children: s("Accept new comments") }),
        /* @__PURE__ */ e.jsx(a.Switch, { id: "comments-open", checked: !c.comments_closed, onCheckedChange: (x) => p({ comments_closed: !x }) })
      ] }),
      /* @__PURE__ */ e.jsx("a", { href: _(`cms/comments?entry=${n.split("/").slice(-1)[0]}`), className: "cms:w-fit cms:text-xs cms:text-muted-foreground cms:underline-offset-4 cms:hover:text-foreground cms:hover:underline", children: m === null ? s("View comments") : s("View comments (:count)", { count: m }) })
    ] })
  ] }) });
}
function Me({ presentation: n, taxonomies: i, value: r, labels: d, errors: u, changed: t, disabled: c, onChange: g }) {
  if (i.length === 0) return null;
  const p = t.some((h) => h.startsWith("terms.")), f = u.terms !== void 0 || i.some((h) => u[`terms.${h.handle}`] !== void 0), m = n?.organization ?? s("Taxonomies");
  return /* @__PURE__ */ e.jsx(a.CollapsibleCard, { title: p ? /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    m,
    /* @__PURE__ */ e.jsx(ee, {})
  ] }) : m, titleClassName: "cms:text-base", storageKey: "cms:entry:taxonomies", hasErrors: f, children: /* @__PURE__ */ e.jsx(Pe.Provider, { value: d, children: /* @__PURE__ */ e.jsxs("fieldset", { disabled: c, className: "cms:flex cms:min-w-0 cms:flex-col cms:gap-4 cms:text-sm", children: [
    i.map((h) => {
      const j = `terms-${h.handle}`, y = r[h.handle] ?? [], D = u[`terms.${h.handle}`], x = n?.pickers[h.handle];
      return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:min-w-0 cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsxs(a.Label, { htmlFor: j, children: [
          h.title,
          t.includes(`terms.${h.handle}`) && /* @__PURE__ */ e.jsx(ee, {})
        ] }),
        /* @__PURE__ */ e.jsx(
          bs,
          {
            id: j,
            taxonomy: h.handle,
            multiple: !h.single,
            max: null,
            required: !1,
            invalid: D !== void 0,
            placeholder: x?.select,
            searchPlaceholder: x?.search,
            value: h.single ? y[0] ?? null : y,
            onChange: (M) => g(h.handle, M === null ? [] : Array.isArray(M) ? M : [M])
          }
        ),
        h.single && !x && /* @__PURE__ */ e.jsx("p", { className: "cms:text-xs cms:text-muted-foreground", children: s("One term only.") }),
        /* @__PURE__ */ e.jsx(E, { message: D })
      ] }, h.handle);
    }),
    /* @__PURE__ */ e.jsx(E, { message: u.terms })
  ] }) }) });
}
export {
  Ct as default
};
