import { j as e, a as U, t as s, r as G, l as q } from "./admin-BJZuWFbX.js";
import { c as R, _ } from "./createLucideIcon-Ccbp7F45.js";
import { u as n } from "./ui-Dh5wfMwT.js";
import { E as ie } from "./EntriesPicker-BIdhV-Id.js";
import { F as re } from "./FieldError-CrnP2AMi.js";
import { j as ce, T as oe, p as me, t as ue } from "./TermsPicker-BllVnJA-.js";
import { V as de } from "./VersionConflict-CyqkOmVX.js";
import { c as J, r as he } from "./tree-B7sRX6dH.js";
import { U as ge } from "./UnsavedNote-Cg5PBZU1.js";
import { P as pe } from "./plus-COqahUZ2.js";
import { L as xe, T as fe } from "./tags-DR5XKR3w.js";
import { L as ye } from "./link-2-BYZeXgi5.js";
import { L as je } from "./loader-circle-ByksABXO.js";
import { S as be } from "./settings-2-0VUe76YZ.js";
import { P as ve } from "./pencil-D-dwWCMx.js";
import { T as Se } from "./Confirm-DcnjU4f1.js";
const K = {
  name: "list-indent-decrease",
  size: 24,
  node: [
    ["path", { d: "M21 5H11", key: "us1j55" }],
    ["path", { d: "M21 12H11", key: "wd7e0v" }],
    ["path", { d: "M21 19H11", key: "saa85w" }],
    ["path", { d: "m7 8-4 4 4 4", key: "o5hrat" }]
  ],
  aliases: ["outdent", "indent-decrease"]
};
K.node;
const _e = R(K);
const X = {
  name: "list-indent-increase",
  size: 24,
  node: [
    ["path", { d: "M21 5H11", key: "us1j55" }],
    ["path", { d: "M21 12H11", key: "wd7e0v" }],
    ["path", { d: "M21 19H11", key: "saa85w" }],
    ["path", { d: "m3 8 4 4-4 4", key: "1a3j6y" }]
  ],
  aliases: ["indent", "indent-increase"]
};
X.node;
const ke = R(X);
const Y = {
  name: "tag",
  size: 24,
  node: [
    [
      "path",
      {
        d: "M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z",
        key: "vktsd0"
      }
    ],
    ["circle", { cx: "7.5", cy: "7.5", r: ".5", fill: "currentColor", key: "kqv944" }]
  ]
};
Y.node;
const Ce = R(Y);
let Z = 0;
function ee(t, a = 0) {
  return t.flatMap(({ children: i, ...r }) => [{ ...r, key: `m${++Z}`, depth: a }, ...ee(i ?? [], a + 1)]);
}
function Ne(t) {
  const a = [], i = [{ depth: -1, children: a }];
  for (const { key: r, depth: u, ...p } of t) {
    for (; i.length > 1 && i[i.length - 1].depth >= u; ) i.pop();
    const b = { ...p, children: [] };
    i[i.length - 1].children.push(b), i.push({ depth: u, children: b.children });
  }
  return a;
}
function O(t, a) {
  const i = t[a]?.depth ?? 0;
  let r = a + 1;
  for (; r < t.length && t[r].depth > i; ) r++;
  return r;
}
function te(t, a, i) {
  const r = O(t, a);
  return t.map((u, p) => p >= a && p < r ? { ...u, depth: u.depth + i } : u);
}
function we(t, a, i) {
  const r = t[a], u = t[a - 1];
  return !r || !u || r.depth > u.depth || Math.max(...t.slice(a, O(t, a)).map((b) => b.depth)) + 1 > i - 1 ? t : te(t, a, 1);
}
function Le(t, a) {
  const i = t[a];
  if (!i || i.depth === 0) return t;
  let r = a - 1;
  for (; r > 0 && t[r].depth >= i.depth; ) r--;
  const u = O(t, a), p = O(t, r), b = te(t, a, -1).slice(a, u);
  return [...t.slice(0, a), ...t.slice(u, p), ...b, ...t.slice(p)];
}
function Ie(t, a) {
  return [...t.slice(0, a), ...t.slice(O(t, a))];
}
function V(t) {
  return { key: `m${++Z}`, depth: 0, entry_id: null, term_id: null, taxonomy_id: null, collection_id: null, target: null, url: null, labels: {}, new_tab: !1, query: null, ...t };
}
function Te(t) {
  return t.url !== null || t.collection_id !== null && (t.query ?? "").trim() !== "" ? "main" : "title";
}
function le(t) {
  return t.url !== null ? "url" : t.term_id !== null ? "term" : (t.taxonomy_id ?? null) !== null ? "index" : t.entry_id === null && t.collection_id !== null ? "listing" : "entry";
}
function Fe(t, a, i) {
  return t.map((r, u) => u === a ? { ...r, entry_id: null, term_id: null, taxonomy_id: null, collection_id: null, url: null, query: null, target: null, ...i } : r);
}
function Ze(t) {
  return /* @__PURE__ */ e.jsx(Be, { ...t }, t.version);
}
function Be({ menu: t, items: a, version: i, locales: r, limits: u, terms: p, termTaxonomies: b = [], listings: I, indexes: Q = [], can: x, settings: H }) {
  const h = U(`cms/menus/${t.handle}/links`);
  n.useBreadcrumbs([{ label: s("Menus"), href: U("cms/menus") }, { label: t.title }]);
  const [o, T] = _.useState(() => ee(a)), [D, f] = _.useState(null), [B, E] = _.useState(null), M = B === null ? null : o[B] ?? null, C = G.useForm({ items: a, version: i }), F = C.errors, [z, A] = _.useState(!1), v = r[0] ?? "en", N = (d) => {
    T(d), A(!0);
  }, y = (d, m) => N(o.map((k, S) => S === d ? { ...k, ...m } : k)), L = (d) => {
    C.processing || (C.transform(() => ({ items: Ne(o).map(se), version: d ? i : null })), C.put(h, { preserveScroll: !0, onSuccess: () => A(!1) }));
  }, P = () => L(!0), w = (d) => {
    d.preventDefault(), P();
  };
  n.useUnsavedChanges(z, x.update ? P : void 0);
  const $ = (d) => /* @__PURE__ */ e.jsx(
    n.SortableList,
    {
      items: J(o, d),
      getId: (m) => o[m].key,
      getLabel: (m) => o[m].labels[v] || o[m].target?.title || o[m].url || "link",
      disabled: !x.update,
      onReorder: (m) => N(he(o, d, m)),
      className: d < 0 ? "cms:gap-1" : "cms:mt-1 cms:gap-1 cms:pl-6",
      children: (m, { handle: k, isOverlay: S }) => {
        const c = o[m];
        return /* @__PURE__ */ e.jsxs("div", { className: `cms:rounded-lg cms:border cms:bg-card ${S ? "" : "cms:border-border/70"}`, children: [
          /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-start cms:gap-2 cms:p-2", children: [
            x.update && /* @__PURE__ */ e.jsx("div", { className: "cms:flex cms:h-10 cms:shrink-0 cms:items-center", children: /* @__PURE__ */ e.jsx(n.SortableHandle, { ...k, label: s("Move :title", { title: c.labels[v] || c.target?.title || c.url || s("link") }) }) }),
            /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:min-w-0 cms:flex-1 cms:flex-col cms:gap-2", children: [
              /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-wrap cms:items-center cms:gap-2", children: [
                /* @__PURE__ */ e.jsx(
                  n.Input,
                  {
                    "aria-label": s("Label (:language)", { language: q(v) }),
                    className: "cms:w-full cms:sm:max-w-xs",
                    disabled: !x.update,
                    placeholder: c.target?.title ?? s("Label"),
                    value: c.labels[v] ?? "",
                    onChange: (g) => y(m, { labels: { ...c.labels, [v]: g.target.value } })
                  }
                ),
                /* @__PURE__ */ e.jsx("span", { className: "cms:min-w-32 cms:flex-1 cms:truncate cms:text-sm cms:text-muted-foreground", children: c.url !== null ? c.url : /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
                  c.target ? `${c.target.kind}: ${c.target.title}` : s("Gone"),
                  " ",
                  (!c.target || !c.target.live) && /* @__PURE__ */ e.jsx(n.Badge, { variant: "outline", children: s("Not on the site") })
                ] }) }),
                x.update && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:items-center", children: [
                  /* @__PURE__ */ e.jsxs("label", { className: "cms:mr-2 cms:flex cms:items-center cms:gap-1.5 cms:text-sm", children: [
                    /* @__PURE__ */ e.jsx(n.Checkbox, { checked: c.new_tab, onCheckedChange: (g) => y(m, { new_tab: g }) }),
                    " ",
                    s("New tab")
                  ] }),
                  /* @__PURE__ */ e.jsx(n.Button, { type: "button", variant: "ghost", size: "icon", className: "cms:size-8", "aria-label": s("Change where it links"), title: s("Change where it links"), onClick: () => E(m), children: /* @__PURE__ */ e.jsx(ve, {}) }),
                  /* @__PURE__ */ e.jsx(n.Button, { type: "button", variant: "ghost", size: "icon", className: "cms:size-8", "aria-label": s("Outdent"), disabled: c.depth === 0, onClick: () => N(Le(o, m)), children: /* @__PURE__ */ e.jsx(_e, {}) }),
                  /* @__PURE__ */ e.jsx(n.Button, { type: "button", variant: "ghost", size: "icon", className: "cms:size-8", "aria-label": s("Indent"), onClick: () => N(we(o, m, u.depth)), children: /* @__PURE__ */ e.jsx(ke, {}) }),
                  /* @__PURE__ */ e.jsx(n.Button, { type: "button", variant: "ghost", size: "icon", className: "cms:size-8 cms:text-destructive", "aria-label": s("Remove, with what's under it"), onClick: () => N(Ie(o, m)), children: /* @__PURE__ */ e.jsx(Se, {}) })
                ] })
              ] }),
              c.collection_id !== null && c.term_id === null && !c.taxonomy_id && /* @__PURE__ */ e.jsx(
                n.Input,
                {
                  "aria-label": s("Filters"),
                  className: "cms:w-full cms:sm:max-w-md cms:font-mono",
                  disabled: !x.update,
                  placeholder: s("Filters (optional): :example", { example: "filter=value" }),
                  value: c.query ?? "",
                  onChange: (g) => y(m, { query: g.target.value })
                }
              ),
              r.length > 1 && /* @__PURE__ */ e.jsx("div", { className: "cms:flex cms:flex-wrap cms:gap-2", children: r.slice(1).map((g) => /* @__PURE__ */ e.jsx(
                n.Input,
                {
                  "aria-label": s("Label (:language)", { language: q(g) }),
                  className: "cms:w-full cms:sm:max-w-xs",
                  disabled: !x.update,
                  placeholder: Te(c) === "title" ? s(":language: its title there, else as :main", { language: q(g), main: q(v) }) : s(":language: as :main", { language: q(g), main: q(v) }),
                  value: c.labels[g] ?? "",
                  onChange: (l) => y(m, { labels: { ...c.labels, [g]: l.target.value } })
                },
                g
              )) })
            ] })
          ] }),
          !S && J(o, m).length > 0 && /* @__PURE__ */ e.jsx("div", { className: "cms:px-2 cms:pb-2", children: $(m) })
        ] });
      }
    }
  );
  return /* @__PURE__ */ e.jsxs("form", { onSubmit: w, className: "cms:flex cms:max-w-5xl cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(G.Head, { title: t.title }),
    /* @__PURE__ */ e.jsx(
      n.PageHeader,
      {
        title: t.title,
        menu: H ? [{ label: s("Settings"), href: H, icon: /* @__PURE__ */ e.jsx(be, {}) }] : [],
        back: { href: U("cms/menus"), label: s("Back to menus") },
        actions: x.update && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          /* @__PURE__ */ e.jsxs(n.Button, { type: "button", variant: "outline", disabled: o.length >= u.items, onClick: () => f("entry"), children: [
            /* @__PURE__ */ e.jsx(pe, {}),
            " ",
            s("Entry")
          ] }),
          (p === null ? b.length > 0 : p.length > 0) && /* @__PURE__ */ e.jsxs(n.Button, { type: "button", variant: "outline", disabled: o.length >= u.items, onClick: () => f("term"), children: [
            /* @__PURE__ */ e.jsx(Ce, {}),
            " ",
            s("Term")
          ] }),
          I.length > 0 && /* @__PURE__ */ e.jsxs(n.Button, { type: "button", variant: "outline", disabled: o.length >= u.items, onClick: () => f("listing"), children: [
            /* @__PURE__ */ e.jsx(xe, {}),
            " ",
            s("Listing")
          ] }),
          Q.length > 0 && /* @__PURE__ */ e.jsxs(n.Button, { type: "button", variant: "outline", disabled: o.length >= u.items, onClick: () => f("index"), children: [
            /* @__PURE__ */ e.jsx(fe, {}),
            " ",
            s("Taxonomy index")
          ] }),
          /* @__PURE__ */ e.jsxs(n.Button, { type: "button", variant: "outline", disabled: o.length >= u.items, onClick: () => f("url"), children: [
            /* @__PURE__ */ e.jsx(ye, {}),
            " ",
            s("Link")
          ] }),
          /* @__PURE__ */ e.jsxs(n.Button, { type: "submit", disabled: C.processing, children: [
            C.processing && /* @__PURE__ */ e.jsx(je, { className: "cms:animate-spin" }),
            " ",
            s("Save")
          ] })
        ] }),
        children: /* @__PURE__ */ e.jsx(ge, { dirty: z })
      }
    ),
    /* @__PURE__ */ e.jsx(de, { message: F.version, processing: C.processing, onSaveMine: () => L(!1) }),
    /* @__PURE__ */ e.jsx(re, { message: F.items }),
    Object.keys(F).some((d) => d.startsWith("items.")) && /* @__PURE__ */ e.jsx("p", { role: "alert", className: "cms:text-sm cms:text-destructive", children: s("Some links need fixing: :error", { error: Object.values(F).filter(Boolean)[0] }) }),
    /* @__PURE__ */ e.jsx(n.Card, { className: "cms:p-2", children: o.length === 0 ? /* @__PURE__ */ e.jsx("p", { className: "cms:p-4 cms:text-center cms:text-muted-foreground", children: s("No links yet. Add an entry or a link.") }) : $(-1) }),
    /* @__PURE__ */ e.jsx(
      Pe,
      {
        kind: D ?? (M ? le(M) : null),
        editing: D ? null : M,
        terms: p,
        termTaxonomies: b,
        listings: I,
        indexes: Q,
        onClose: () => {
          f(null), E(null);
        },
        main: v,
        onAdd: (d) => {
          if (B !== null && !D) {
            const { entry_id: m, term_id: k, taxonomy_id: S, collection_id: c, url: g, query: l, target: j } = d;
            N(Fe(o, B, { entry_id: m, term_id: k, taxonomy_id: S, collection_id: c, url: g, query: l, target: j }));
          } else
            N([...o, d]);
          f(null), E(null);
        }
      }
    )
  ] });
}
function se({ target: t, children: a, ...i }) {
  return { ...i, children: a.map(se) };
}
const De = () => s("A menu links to entries that already exist: create the page first (Content → Entries), then add it here, or add a web address instead."), Ee = () => ({ entry: s("Link to an entry"), term: s("Link to a term's page"), listing: s("Link to a listing page"), index: s("Link to a taxonomy's index page"), url: s("Link to an address") }), Me = () => ({
  entry: s("It follows the entry: its title (unless you give a label) and its address in each language. It shows only while the entry is on the site."),
  term: s("The page listing the term's entries, in each language. Its title is the label unless you give one."),
  listing: s("The collection's listing page, in each language, optionally with filters. The collection's title is the label unless you give one."),
  index: s("The page listing a taxonomy's terms, in each language. The taxonomy's title is the label unless you give one."),
  url: s("A web address, a path on this site (/contact), mailto: or tel:.")
});
function Pe({ kind: t, editing: a = null, terms: i, termTaxonomies: r, listings: u, indexes: p, onClose: b, onAdd: I, main: Q }) {
  const [x, H] = _.useState(null), [h, o] = _.useState(""), [T, D] = _.useState(""), [f, B] = _.useState(""), [E, M] = _.useState(""), [C, F] = _.useState(""), [z, A] = _.useState("");
  _.useEffect(() => {
    const l = a ? le(a) : null;
    H(a?.entry_id ?? null), o(l === "term" ? String(a?.term_id ?? "") : l === "index" ? String(a?.taxonomy_id ?? "") : l === "listing" ? String(a?.collection_id ?? "") : ""), F(l === "term" || l === "index" ? String(a?.collection_id ?? "") : ""), A(String((l === "term" ? a?.target?.taxonomy : void 0) ?? r[0]?.id ?? "")), D(a?.url ?? ""), B(""), M(a?.query ?? "");
  }, [t, a, r]);
  const v = (l) => {
    o(l), F("");
  }, N = t === "url" && !a, y = i === null ? r.find((l) => String(l.id) === z) : void 0, L = t !== "term" || h === "" ? void 0 : i !== null ? i.find((l) => String(l.id) === h) : y ? { id: Number(h), title: a?.term_id === Number(h) ? a.target?.title ?? "" : "", taxonomy: y.title, pages: y.pages } : void 0, P = L?.pages.find((l) => String(l.collection ?? "") === C) ?? L?.pages[0], w = t === "index" ? p.find((l) => String(l.id) === h) : void 0, $ = w?.pages.find((l) => String(l.collection ?? "") === C) ?? w?.pages[0], d = L ?? w, m = L ? P : $, k = T.trim() === "" || ce(T.trim()), S = f.trim() ? { [Q]: f.trim() } : {}, c = async () => {
    if (t === "entry" && x !== null) {
      const l = await fetch(`${U("cms/entries/picker")}?${me({ ids: [x], collections: [] })}`, { headers: { Accept: "application/json" }, credentials: "same-origin" }), j = l.ok ? (await l.json()).items[0] : void 0;
      I(V({ entry_id: x, target: j ? { title: j.title, kind: j.collection, live: j.status === "published" } : null, labels: S }));
    } else if (t === "term" && h !== "") {
      const l = L, j = P?.collection ?? null, ne = j === null ? s("Shared page") : P?.title ?? "", ae = l && y ? await fetch(`${U("cms/terms/picker")}?${ue({ taxonomy: y.handle, ids: [l.id] })}`, { headers: { Accept: "application/json" }, credentials: "same-origin" }).then(async (W) => W.ok ? (await W.json()).items[0]?.label ?? l.title : l.title).catch(() => l.title) : l?.title;
      I(V({ term_id: Number(h), collection_id: j, target: l ? { title: ae ?? "", kind: `${l.taxonomy} · ${ne}`, live: !0, ...y ? { taxonomy: y.id } : {} } : null, labels: S }));
    } else if (t === "index" && h !== "" && w) {
      const l = $?.collection ?? null, j = l === null ? s(":taxonomy · Index page", { taxonomy: w.title }) : s(":taxonomy · :collection index", { taxonomy: w.title, collection: $?.title ?? "" });
      I(V({ taxonomy_id: w.id, collection_id: l, target: { title: w.title, kind: j, live: !0 }, labels: S }));
    } else if (t === "listing" && h !== "") {
      const l = u.find((j) => String(j.id) === h);
      I(V({ collection_id: Number(h), target: l ? { title: l.title, kind: s("Listing page"), live: !0 } : null, labels: S, query: E.trim().replace(/^\?/, "") || null }));
    } else t === "url" && T.trim() !== "" && k && (f.trim() !== "" || !N) && I(V({ url: T.trim(), labels: S }));
  }, g = t === "entry" ? x !== null : t === "url" ? T.trim() !== "" && k && (f.trim() !== "" || !N) : h !== "";
  return /* @__PURE__ */ e.jsx(n.Dialog, { open: t !== null, onOpenChange: (l) => !l && b(), children: /* @__PURE__ */ e.jsxs(n.DialogContent, { children: [
    /* @__PURE__ */ e.jsxs(n.DialogHeader, { children: [
      /* @__PURE__ */ e.jsx(n.DialogTitle, { children: a ? s("Change where it links") : t ? Ee()[t] : "" }),
      /* @__PURE__ */ e.jsx(n.DialogDescription, { children: t ? Me()[t] : "" })
    ] }),
    /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-3", children: [
      t === "entry" && /* @__PURE__ */ e.jsx(
        ie,
        {
          id: "menu-entry",
          value: x,
          multiple: !1,
          max: null,
          collections: [],
          invalid: !1,
          emptyHint: De(),
          onChange: (l) => H(typeof l == "number" ? l : null)
        }
      ),
      t === "term" && i === null && /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
        r.length > 1 && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
          /* @__PURE__ */ e.jsx(n.Label, { htmlFor: "menu-term-taxonomy", children: s("Taxonomy") }),
          /* @__PURE__ */ e.jsxs(n.Select, { value: z, onValueChange: (l) => {
            A(l), v("");
          }, children: [
            /* @__PURE__ */ e.jsx(n.SelectTrigger, { id: "menu-term-taxonomy", children: /* @__PURE__ */ e.jsx(n.SelectValue, { placeholder: s("Choose…") }) }),
            /* @__PURE__ */ e.jsx(n.SelectContent, { children: r.map((l) => /* @__PURE__ */ e.jsx(n.SelectItem, { value: String(l.id), children: l.title }, l.id)) })
          ] })
        ] }),
        /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
          /* @__PURE__ */ e.jsx(n.Label, { htmlFor: "menu-target", children: s("Term") }),
          /* @__PURE__ */ e.jsx(
            oe,
            {
              id: "menu-target",
              taxonomy: y?.handle ?? null,
              multiple: !1,
              max: null,
              required: !1,
              invalid: !1,
              value: h === "" ? null : Number(h),
              onChange: (l) => v(typeof l == "number" ? String(l) : "")
            }
          )
        ] })
      ] }),
      (t === "term" && i !== null || t === "listing" || t === "index") && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(n.Label, { htmlFor: "menu-target", children: t === "term" ? s("Term") : t === "index" ? s("Taxonomy") : s("Collection") }),
        /* @__PURE__ */ e.jsxs(n.Select, { value: h, onValueChange: v, children: [
          /* @__PURE__ */ e.jsx(n.SelectTrigger, { id: "menu-target", children: /* @__PURE__ */ e.jsx(n.SelectValue, { placeholder: s("Choose…") }) }),
          /* @__PURE__ */ e.jsx(n.SelectContent, { children: t === "term" ? (i ?? []).map((l) => /* @__PURE__ */ e.jsxs(n.SelectItem, { value: String(l.id), children: [
            l.taxonomy,
            ": ",
            l.title
          ] }, l.id)) : (t === "index" ? p : u).map((l) => /* @__PURE__ */ e.jsx(n.SelectItem, { value: String(l.id), children: l.title }, l.id)) })
        ] })
      ] }),
      d && d.pages.length > 0 && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(n.Label, { htmlFor: "menu-term-page", children: s("Page") }),
        /* @__PURE__ */ e.jsxs(n.Select, { value: String(m?.collection ?? "") || "__all", onValueChange: (l) => F(l === "__all" ? "" : l), children: [
          /* @__PURE__ */ e.jsx(n.SelectTrigger, { id: "menu-term-page", children: /* @__PURE__ */ e.jsx(n.SelectValue, {}) }),
          /* @__PURE__ */ e.jsx(n.SelectContent, { children: d.pages.map((l) => /* @__PURE__ */ e.jsx(n.SelectItem, { value: l.collection === null ? "__all" : String(l.collection), children: l.collection === null ? l.title : s(":collection only", { collection: l.title }) }, l.collection ?? "__all")) })
        ] }),
        /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: L ? s("The shared page lists the term's entries from every collection; a collection's page only its own.") : s("The shared index lists all the taxonomy's terms; a collection's only those its entries have.") })
      ] }),
      t === "listing" && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(n.Label, { htmlFor: "menu-query", children: s("Filters (optional)") }),
        /* @__PURE__ */ e.jsx(
          n.Input,
          {
            id: "menu-query",
            className: "cms:font-mono",
            value: E,
            placeholder: "filter=value&other=value",
            onChange: (l) => M(l.target.value)
          }
        ),
        /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: s("What the listing page's filters put after the ? in its address. Each language's link gets them, and a term may be named by its slug in any language.") })
      ] }),
      t === "url" && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(n.Label, { htmlFor: "menu-url", children: s("Address") }),
        /* @__PURE__ */ e.jsx(
          n.Input,
          {
            id: "menu-url",
            value: T,
            placeholder: s("https://… or /contact"),
            "aria-invalid": !k,
            onChange: (l) => D(l.target.value)
          }
        ),
        !k && /* @__PURE__ */ e.jsx("p", { className: "cms:text-sm cms:text-destructive", children: s("This address could run code; use https://, a path, mailto: or tel:.") })
      ] }),
      !a && /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-2", children: [
        /* @__PURE__ */ e.jsx(n.Label, { htmlFor: "menu-label", children: t === "url" ? s("Label") : s("Label (optional)") }),
        /* @__PURE__ */ e.jsx(n.Input, { id: "menu-label", value: f, onChange: (l) => B(l.target.value) })
      ] })
    ] }),
    /* @__PURE__ */ e.jsxs(n.DialogFooter, { children: [
      /* @__PURE__ */ e.jsx(n.Button, { type: "button", variant: "outline", onClick: b, children: s("Cancel") }),
      /* @__PURE__ */ e.jsx(n.Button, { type: "button", onClick: () => {
        c();
      }, disabled: !g, children: a ? s("Change") : s("Add") })
    ] })
  ] }) });
}
export {
  Ze as default
};
