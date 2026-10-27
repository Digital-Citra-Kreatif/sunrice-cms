import { j as c, s as he, m as ge, t as l, r as be, a as xe } from "./admin-B85tCaRI.js";
import { u as g } from "./ui-Dh5wfMwT.js";
import { c as Y, _ as u } from "./createLucideIcon-Ccbp7F45.js";
import { C as we } from "./check-OeKFYRnl.js";
import { S as ye } from "./search-3zKi7F1_.js";
const ee = {
  name: "chevrons-up-down",
  size: 24,
  node: [
    ["path", { d: "m7 15 5 5 5-5", key: "1hf1tw" }],
    ["path", { d: "m7 9 5-5 5 5", key: "sgt6xg" }]
  ]
};
ee.node;
const ve = Y(ee);
const se = {
  name: "x",
  size: 24,
  node: [
    ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
    ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
  ]
};
se.node;
const je = Y(se);
function F(e) {
  return e && typeof e == "object" && !Array.isArray(e) ? e : {};
}
function Oe(e, s) {
  if (typeof e != "string" || e === "") return "";
  const n = /^(\d{4}-\d{2}-\d{2})(?:[T ](\d{2}:\d{2}))?/.exec(e);
  return n ? s ? `${n[1]}T${n[2] ?? "00:00"}` : n[1] ?? "" : "";
}
function Ve(e) {
  return e === "" ? null : e;
}
function He(e) {
  const s = typeof e == "number" ? e : typeof e == "string" && e.trim() !== "" ? Number(e) : NaN;
  return !Number.isFinite(s) || Math.abs(s) < 1e4 ? null : new Intl.NumberFormat("en", { maximumFractionDigits: 20 }).format(s);
}
function Ke(e, s, n, r) {
  return s || e.some((i) => ["none", ""].includes(i.label.trim().toLowerCase()) || i.value.trim().toLowerCase() === "none") ? !1 : !n || !r;
}
function Qe(e) {
  return { ...structuredClone(F(e)), _hidden: !1 };
}
function Ne(e, s, n = 60) {
  for (const r of e) {
    const i = s[r.handle];
    let a = null;
    ["text", "textarea", "email", "url"].includes(r.type) && typeof i == "string" ? a = i : r.type === "rich_text" && typeof i == "string" ? a = Se(i.replace(/<[^>]*>/g, " ")) : r.type === "group" && Array.isArray(r.fields) && (a = Ne(r.fields, F(i), n));
    const b = (a ?? "").replace(/\s+/g, " ").trim();
    if (b !== "") return b.length > n ? `${b.slice(0, n - 1).trimEnd()}…` : b;
  }
  return null;
}
const Ce = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " " };
function Se(e) {
  return e.replace(/&(#x[0-9a-f]+|#[0-9]+|[a-z]+);/gi, (s, n) => {
    if (n[0] === "#") {
      const r = n[1] === "x" || n[1] === "X" ? parseInt(n.slice(2), 16) : parseInt(n.slice(1), 10);
      return Number.isInteger(r) && r > 0 && r <= 1114111 && (r < 55296 || r > 57343) ? String.fromCodePoint(r) : s;
    }
    return Ce[n.toLowerCase()] ?? s;
  });
}
function Xe(e, s) {
  return { type: e, hidden: !1, values: structuredClone(F(s)) };
}
function Ze(e) {
  const s = e.replace(/[\u0000- \u007f]+/g, ""), n = /^([a-zA-Z][a-zA-Z0-9+.-]*):/.exec(s);
  return n ? ["http", "https", "mailto", "tel"].includes(n[1].toLowerCase()) : !s.includes("\\");
}
function Ge({ ids: e, search: s, collections: n }) {
  const r = new URLSearchParams();
  for (const i of e ?? []) r.append("ids[]", String(i));
  s && r.set("search", s);
  for (const i of n) r.append("collections[]", i);
  return r.toString();
}
let Ae = 0;
function Je(e, s) {
  return e.length === s ? e.slice() : e.length < s ? [...e, ...Array.from({ length: s - e.length }, () => `k${++Ae}`)] : e.slice(0, s);
}
function De({ taxonomy: e, q: s, offset: n, except: r, ids: i }) {
  const a = new URLSearchParams({ taxonomy: e });
  s && a.set("q", s), n && a.set("offset", String(n)), r && a.set("except", String(r));
  for (const b of i ?? []) a.append("ids[]", String(b));
  return a.toString();
}
function $e(e) {
  return (e.type === "entry" ? typeof e.entry_id != "number" : e.url === "" || e.url === void 0 || e.url === null) ? e.label || e.new_tab ? e : null : e;
}
function We(e, s, n, r) {
  const i = s === "url" ? { ...r, url: e.url } : { ...r, entry_id: e.entry_id }, a = { ...e, type: n, url: n === "url" ? i.url : void 0, entry_id: n === "entry" ? i.entry_id : void 0 };
  return { value: $e(a), remembered: i };
}
function Ye({ status: e, changes: s = !1 }) {
  return /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
    /* @__PURE__ */ c.jsx(g.Badge, { variant: e === "published" ? "success" : "secondary", children: he(e) }),
    ge({ status: e, changes: s }) && /* @__PURE__ */ c.jsx(g.Badge, { variant: "warning", title: l("Saved changes visitors don't see yet"), children: l("Changes pending") })
  ] });
}
function es() {
  return /* @__PURE__ */ c.jsxs("span", { title: l("Different from the live version"), className: "cms:ml-2 cms:inline-flex cms:items-center cms:gap-1 cms:align-middle cms:text-xs cms:font-normal cms:text-amber-700 cms:dark:text-amber-400", children: [
    /* @__PURE__ */ c.jsx("span", { "aria-hidden": !0, className: "cms:size-1.5 cms:rounded-full cms:bg-amber-500" }),
    l("Changed"),
    /* @__PURE__ */ c.jsxs("span", { className: "cms:sr-only", children: [
      " (",
      l("Different from the live version"),
      ")"
    ] })
  ] });
}
function ke(e) {
  return e === null ? [] : Array.isArray(e) ? e : [e];
}
function te(e, s, n) {
  return s && n !== null && e.length >= n;
}
function Ee(e, s, n, r) {
  return n ? e.includes(s) ? e.filter((i) => i !== s) : te(e, n, r) ? e.slice() : [...e, s] : [s];
}
function Te(e) {
  return e.slice(0, -1);
}
function Le(e, s) {
  return s ? e.slice() : e[0] ?? null;
}
function Pe(e, s, n, r = () => !1) {
  const i = s === "ArrowDown" || s === "Home" ? 1 : s === "ArrowUp" || s === "End" ? -1 : 0;
  if (i === 0 || n === 0) return e;
  let a = s === "Home" ? 0 : s === "End" ? n - 1 : e + i;
  for (s === "ArrowUp" && e === -1 && (a = n - 1); a >= 0 && a < n && r(a); ) a += i;
  return a >= 0 && a < n ? a : e;
}
function _e(e, s) {
  const n = new Set(e.map((r) => r.id));
  return [...e, ...s.filter((r) => !n.has(r.id))];
}
function Me(e) {
  const s = [], n = {};
  for (const r of e)
    s.length = Math.min(s.length, r.depth), n[r.id] = s.slice(), s.push(r.label);
  return n;
}
function W(e, s) {
  return [...s ?? [], e].join(" › ");
}
const ze = u.createContext({});
function qe(e) {
  const s = e.termParents;
  return s && typeof s == "object" && !Array.isArray(s) ? s : {};
}
async function U(e, s) {
  const n = await fetch(`${xe("cms/terms/picker")}?${De(e)}`, { headers: { Accept: "application/json" }, credentials: "same-origin", signal: s });
  if (!n.ok) throw new Error(String(n.status));
  return await n.json();
}
function ss({ id: e, taxonomy: s, multiple: n, max: r, required: i, invalid: a, value: b, onChange: ne, placeholder: re, except: A = null }) {
  const ce = u.useContext(ze), oe = qe(be.usePage().props), p = ke(b), [N, I] = u.useState(!1), [D, O] = u.useState(""), [m, V] = u.useState(null), [$, H] = u.useState(!1), [ie, C] = u.useState(!1), [ae, le] = u.useState(0), [k, me] = u.useState({}), [d, E] = u.useState(-1), T = u.useRef(!1), L = u.useRef(null), K = u.useRef(null), P = D.trim(), v = u.useCallback((t, o) => {
    const f = o ? Me(t) : {};
    me((y) => {
      const S = { ...y };
      for (const w of t) S[w.id] = { label: w.label, parents: f[w.id] ?? w.parents ?? y[w.id]?.parents };
      return S;
    });
  }, []), h = N && s ? P : null;
  u.useEffect(() => {
    if (h === null || s === null || K.current === `${s}
${h}`) return;
    const t = new AbortController(), o = window.setTimeout(() => {
      U({ taxonomy: s, q: h, except: A }, t.signal).then((f) => {
        K.current = `${s}
${h}`, V({ ...f, q: h }), v(f.items, h === ""), E(h !== "" && f.items.length > 0 ? 0 : -1), C(!1);
      }).catch((f) => {
        f instanceof DOMException && f.name === "AbortError" || C(!0);
      });
    }, h === "" ? 0 : 250);
    return () => {
      window.clearTimeout(o), t.abort();
    };
  }, [s, h, A, ae, v]);
  const Q = (t) => ce[String(t)] ?? k[t]?.label, _ = p.filter((t) => Q(t) === void 0).join(",");
  u.useEffect(() => {
    !s || _ === "" || U({ taxonomy: s, ids: _.split(",").map(Number) }).then((t) => v(t.items, !1)).catch(() => {
    });
  }, [s, _, v]);
  const M = () => {
    !s || !m?.more || $ || m.q !== P || (H(!0), U({ taxonomy: s, q: m.q, offset: m.items.length, except: A }).then((t) => {
      const o = _e(m.items, t.items);
      V({ items: o, more: t.more, q: m.q }), v(o, m.q === "");
    }).catch(() => C(!0)).finally(() => H(!1)));
  };
  if (u.useEffect(() => {
    d >= 0 && m && document.getElementById(`${e}-option-${m.items[d]?.id}`)?.scrollIntoView({ block: "nearest" });
  }, [d, e, m]), !s) return /* @__PURE__ */ c.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: l("Choose a taxonomy for this field in its blueprint.") });
  const X = te(p, n, r), z = n || !i, q = (t) => ne(Le(t, n)), Z = (t) => {
    q(Ee(p, t, n, r)), n || I(!1);
  }, x = m?.items ?? [], B = (t) => X && !p.includes(x[t]?.id ?? -1), R = (t) => Q(t) ?? l("Term #:id", { id: t }), ue = (t) => {
    t || O(""), I(t);
  }, de = (t) => {
    if (t.key === "ArrowDown" || t.key === "ArrowUp") {
      t.preventDefault();
      const o = Pe(d, t.key, x.length, B);
      t.key === "ArrowDown" && o === d && d === x.length - 1 && M(), E(o);
    } else if (t.key === "Enter") {
      t.preventDefault();
      const o = x[d];
      o && !B(d) && Z(o.id);
    } else t.key === "Backspace" && D === "" && z && p.length > 0 && (t.preventDefault(), q(Te(p)));
  }, fe = (t) => {
    const o = t.currentTarget;
    o.scrollTop + o.clientHeight >= o.scrollHeight - 48 && M();
  }, pe = re ?? (n ? l("Choose terms…") : l("Choose a term…")), G = `${e}-listbox`, J = m !== null && m.q !== P;
  let j;
  return ie ? j = /* @__PURE__ */ c.jsxs("div", { className: "cms:flex cms:flex-col cms:items-start cms:gap-2 cms:p-3 cms:text-sm", children: [
    /* @__PURE__ */ c.jsx("p", { className: "cms:text-destructive", children: l("Terms could not be loaded.") }),
    /* @__PURE__ */ c.jsx(g.Button, { type: "button", variant: "outline", size: "sm", onClick: () => {
      C(!1), le((t) => t + 1);
    }, children: l("Try again") })
  ] }) : m === null ? j = /* @__PURE__ */ c.jsx("div", { className: "cms:flex cms:flex-col cms:gap-2 cms:p-2", "aria-busy": "true", "aria-label": l("Loading terms"), children: [70, 55, 80, 45, 65].map((t) => /* @__PURE__ */ c.jsx(g.Skeleton, { className: "cms:h-5", style: { width: `${t}%` } }, t)) }) : x.length === 0 ? j = /* @__PURE__ */ c.jsx("p", { className: "cms:p-3 cms:text-sm cms:text-muted-foreground", children: m.q ? l("No terms match “:search”.", { search: m.q }) : l("Nothing to choose from yet.") }) : j = /* @__PURE__ */ c.jsxs("div", { className: `cms:max-h-72 cms:overflow-y-auto cms:overscroll-contain cms:p-1 ${J ? "cms:opacity-60" : ""}`, onScroll: fe, children: [
    /* @__PURE__ */ c.jsx("div", { role: "listbox", id: G, "aria-label": l("Terms"), "aria-multiselectable": n || void 0, "aria-busy": J || void 0, children: x.map((t, o) => {
      const f = p.includes(t.id), y = B(o), S = W(t.label, k[t.id]?.parents);
      return /* @__PURE__ */ c.jsxs(
        "div",
        {
          id: `${e}-option-${t.id}`,
          role: "option",
          "aria-selected": f,
          "aria-disabled": y || void 0,
          title: S,
          className: `cms:flex cms:cursor-default cms:items-center cms:gap-2 cms:rounded-sm cms:py-1.5 cms:pr-2 cms:text-sm cms:select-none ${o === d ? "cms:bg-accent cms:text-accent-foreground" : ""} ${y ? "cms:opacity-50" : ""}`,
          style: { paddingLeft: `${0.5 + Math.min(t.depth, 6) * 0.875}rem` },
          onMouseDown: (w) => w.preventDefault(),
          onMouseMove: () => {
            o !== d && E(o);
          },
          onClick: () => {
            y || Z(t.id);
          },
          children: [
            /* @__PURE__ */ c.jsx(we, { className: `cms:size-4 cms:shrink-0 ${f ? "" : "cms:invisible"}`, "aria-hidden": "true" }),
            /* @__PURE__ */ c.jsx("span", { className: "cms:min-w-0 cms:truncate", children: t.label })
          ]
        },
        t.id
      );
    }) }),
    m.more && /* @__PURE__ */ c.jsx(g.Button, { type: "button", variant: "ghost", size: "sm", className: "cms:mt-1 cms:w-full", disabled: $, onMouseDown: (t) => t.preventDefault(), onClick: M, children: $ ? l("Loading…") : l("Load more") })
  ] }), /* @__PURE__ */ c.jsxs(g.Popover, { open: N, onOpenChange: ue, children: [
    /* @__PURE__ */ c.jsx(g.PopoverAnchor, { asChild: !0, children: /* @__PURE__ */ c.jsxs(
      "div",
      {
        "data-terms-box": "",
        onPointerDownCapture: () => {
          T.current = !0;
        },
        onClickCapture: () => {
          setTimeout(() => {
            T.current = !1;
          }, 0);
        },
        "data-invalid": a || void 0,
        className: "cms:flex cms:w-full cms:max-w-xl cms:min-w-0 cms:[contain:inline-size] cms:flex-wrap cms:items-center cms:gap-1 cms:rounded-md cms:border cms:border-input/80 cms:bg-card cms:p-1 cms:shadow-xs cms:data-invalid:border-destructive cms:dark:bg-input/20",
        children: [
          p.map((t) => /* @__PURE__ */ c.jsxs(
            "span",
            {
              title: W(R(t), k[t]?.parents ?? oe[String(t)]),
              className: "cms:inline-flex cms:h-7 cms:max-w-full cms:min-w-0 cms:items-center cms:gap-0.5 cms:rounded-sm cms:bg-secondary cms:pl-2 cms:text-xs cms:font-medium cms:text-secondary-foreground",
              children: [
                /* @__PURE__ */ c.jsx("span", { className: `cms:min-w-0 cms:truncate ${z ? "" : "cms:pr-2"}`, children: R(t) }),
                z && /* @__PURE__ */ c.jsx(
                  "button",
                  {
                    type: "button",
                    className: "cms:inline-flex cms:size-7 cms:shrink-0 cms:items-center cms:justify-center cms:rounded-sm cms:text-muted-foreground cms:hover:bg-muted cms:hover:text-foreground cms:focus-visible:ring-2 cms:focus-visible:ring-ring cms:focus-visible:outline-none",
                    "aria-label": l("Remove :term", { term: R(t) }),
                    onMouseDown: (o) => {
                      N && o.preventDefault();
                    },
                    onClick: () => {
                      q(p.filter((o) => o !== t)), N && L.current?.focus();
                    },
                    children: /* @__PURE__ */ c.jsx(je, { className: "cms:size-3", "aria-hidden": "true" })
                  }
                )
              ]
            },
            t
          )),
          /* @__PURE__ */ c.jsx(g.PopoverTrigger, { asChild: !0, children: /* @__PURE__ */ c.jsxs(
            "button",
            {
              id: e,
              type: "button",
              "aria-haspopup": "listbox",
              "aria-invalid": a || void 0,
              className: "cms:flex cms:h-7 cms:min-w-24 cms:flex-1 cms:items-center cms:justify-between cms:gap-1 cms:rounded-sm cms:px-2 cms:text-left cms:text-sm cms:text-muted-foreground cms:hover:bg-muted cms:focus-visible:ring-2 cms:focus-visible:ring-ring cms:focus-visible:outline-none cms:disabled:pointer-events-none cms:disabled:opacity-50",
              children: [
                /* @__PURE__ */ c.jsx("span", { className: "cms:truncate", children: p.length === 0 ? pe : n ? l("Add…") : l("Change…") }),
                /* @__PURE__ */ c.jsx(ve, { className: "cms:size-4 cms:shrink-0 cms:opacity-60", "aria-hidden": "true" })
              ]
            }
          ) })
        ]
      }
    ) }),
    /* @__PURE__ */ c.jsxs(
      g.PopoverContent,
      {
        side: "bottom",
        align: "start",
        sideOffset: 4,
        avoidCollisions: !1,
        className: "cms:max-w-[calc(100vw-2rem)] cms:p-0",
        style: { width: "var(--radix-popper-anchor-width)" },
        onInteractOutside: (t) => {
          (T.current || t.target instanceof Element && t.target.closest("[data-terms-box]")) && t.preventDefault();
        },
        onFocusOutside: (t) => {
          const o = t.target;
          (!(o instanceof Element) || o === document.body || o.closest("[data-terms-box]")) && t.preventDefault();
        },
        onOpenAutoFocus: (t) => {
          t.preventDefault(), L.current?.focus();
        },
        children: [
          /* @__PURE__ */ c.jsxs("div", { className: "cms:relative cms:border-b cms:border-border/60", children: [
            /* @__PURE__ */ c.jsx(ye, { className: "cms:pointer-events-none cms:absolute cms:top-1/2 cms:left-3 cms:size-4 cms:-translate-y-1/2 cms:text-muted-foreground", "aria-hidden": "true" }),
            /* @__PURE__ */ c.jsx(
              "input",
              {
                ref: L,
                type: "text",
                role: "combobox",
                "aria-expanded": "true",
                "aria-controls": G,
                "aria-autocomplete": "list",
                "aria-label": l("Search terms"),
                "aria-activedescendant": d >= 0 && x[d] ? `${e}-option-${x[d].id}` : void 0,
                className: "cms:h-10 cms:w-full cms:bg-transparent cms:pr-3 cms:pl-9 cms:text-sm cms:outline-none cms:placeholder:text-muted-foreground",
                placeholder: l("Search terms"),
                autoComplete: "off",
                value: D,
                onKeyDown: de,
                onChange: (t) => O(t.target.value)
              }
            )
          ] }),
          j,
          X && r !== null && /* @__PURE__ */ c.jsx("p", { className: "cms:border-t cms:border-border/60 cms:px-3 cms:py-2 cms:text-xs cms:text-muted-foreground", children: l("Up to :max terms.", { max: r }) })
        ]
      }
    )
  ] });
}
export {
  es as C,
  Ye as E,
  ss as T,
  je as X,
  ze as a,
  ve as b,
  F as c,
  Ve as d,
  Oe as e,
  Qe as f,
  He as g,
  We as h,
  Ne as i,
  Ze as j,
  $e as l,
  Xe as n,
  Ke as o,
  Ge as p,
  Je as s,
  De as t
};
