import { j as c, s as be, m as xe, t as l, r as we, a as ye } from "./admin-tiVz_6M3.js";
import { u as b } from "./ui-Dh5wfMwT.js";
import { c as ee, _ as u } from "./createLucideIcon-Ccbp7F45.js";
import { C as ve } from "./check-OeKFYRnl.js";
import { S as je } from "./search-3zKi7F1_.js";
const se = {
  name: "chevrons-up-down",
  size: 24,
  node: [
    ["path", { d: "m7 15 5 5 5-5", key: "1hf1tw" }],
    ["path", { d: "m7 9 5-5 5 5", key: "sgt6xg" }]
  ]
};
se.node;
const Ne = ee(se);
const te = {
  name: "x",
  size: 24,
  node: [
    ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
    ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
  ]
};
te.node;
const Ce = ee(te);
function K(e) {
  return e && typeof e == "object" && !Array.isArray(e) ? e : {};
}
function Ge(e, s) {
  if (typeof e != "string" || e === "") return "";
  const n = /^(\d{4}-\d{2}-\d{2})(?:[T ](\d{2}:\d{2}))?/.exec(e);
  return n ? s ? `${n[1]}T${n[2] ?? "00:00"}` : n[1] ?? "" : "";
}
function Qe(e) {
  return e === "" ? null : e;
}
function Xe(e) {
  const s = typeof e == "number" ? e : typeof e == "string" && e.trim() !== "" ? Number(e) : NaN;
  return !Number.isFinite(s) || Math.abs(s) < 1e4 ? null : new Intl.NumberFormat("en", { maximumFractionDigits: 20 }).format(s);
}
function Ze(e, s, n, r) {
  return s || e.some((i) => ["none", ""].includes(i.label.trim().toLowerCase()) || i.value.trim().toLowerCase() === "none") ? !1 : !n || !r;
}
function Je(e) {
  return { ...structuredClone(K(e)), _hidden: !1 };
}
function Se(e, s, n = 60) {
  for (const r of e) {
    const i = s[r.handle];
    let a = null;
    ["text", "textarea", "email", "url"].includes(r.type) && typeof i == "string" ? a = i : r.type === "rich_text" && typeof i == "string" ? a = ke(i.replace(/<[^>]*>/g, " ")) : r.type === "group" && Array.isArray(r.fields) && (a = Se(r.fields, K(i), n));
    const f = (a ?? "").replace(/\s+/g, " ").trim();
    if (f !== "") return f.length > n ? `${f.slice(0, n - 1).trimEnd()}…` : f;
  }
  return null;
}
const Ae = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " " };
function ke(e) {
  return e.replace(/&(#x[0-9a-f]+|#[0-9]+|[a-z]+);/gi, (s, n) => {
    if (n[0] === "#") {
      const r = n[1] === "x" || n[1] === "X" ? parseInt(n.slice(2), 16) : parseInt(n.slice(1), 10);
      return Number.isInteger(r) && r > 0 && r <= 1114111 && (r < 55296 || r > 57343) ? String.fromCodePoint(r) : s;
    }
    return Ae[n.toLowerCase()] ?? s;
  });
}
function We(e, s) {
  return { type: e, hidden: !1, values: structuredClone(K(s)) };
}
function Ye(e) {
  const s = e.replace(/[\u0000- \u007f]+/g, ""), n = /^([a-zA-Z][a-zA-Z0-9+.-]*):/.exec(s);
  return n ? ["http", "https", "mailto", "tel"].includes(n[1].toLowerCase()) : !s.includes("\\");
}
function es({ ids: e, search: s, collections: n }) {
  const r = new URLSearchParams();
  for (const i of e ?? []) r.append("ids[]", String(i));
  s && r.set("search", s);
  for (const i of n) r.append("collections[]", i);
  return r.toString();
}
let De = 0;
function ss(e, s) {
  return e.length === s ? e.slice() : e.length < s ? [...e, ...Array.from({ length: s - e.length }, () => `k${++De}`)] : e.slice(0, s);
}
function $e({ taxonomy: e, q: s, offset: n, except: r, ids: i }) {
  const a = new URLSearchParams({ taxonomy: e });
  s && a.set("q", s), n && a.set("offset", String(n)), r && a.set("except", String(r));
  for (const f of i ?? []) a.append("ids[]", String(f));
  return a.toString();
}
const ne = ["url", "entry", "term", "listing"], N = { url: "url", entry: "entry_id", term: "term_id", listing: "collection_id" };
function Ee(e) {
  return ne.includes(e) ? e : null;
}
function Te(e) {
  const s = Ee(e.type) ?? "url", n = e[N[s]], r = s === "url" ? n === "" || n === void 0 || n === null : typeof n != "number", i = Array.isArray(e.rel) && e.rel.length > 0;
  return r ? e.label || e.new_tab || i ? e : null : e;
}
function ts(e, s, n, r) {
  const i = { ...r, [N[s]]: e[N[s]] }, a = { ...e, type: n };
  for (const f of ne) a[N[f]] = f === n ? i[N[f]] : void 0;
  return { value: Te(a), remembered: i };
}
function ns(e) {
  return e === "url";
}
const Le = ["nofollow", "sponsored", "ugc"];
function rs(e) {
  const s = Array.isArray(e) ? e.filter((n) => typeof n == "string") : typeof e == "string" ? e.split(/\s+/) : [];
  return Le.filter((n) => s.includes(n));
}
function cs({ status: e, changes: s = !1 }) {
  return /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
    /* @__PURE__ */ c.jsx(b.Badge, { variant: e === "published" ? "success" : "secondary", children: be(e) }),
    xe({ status: e, changes: s }) && /* @__PURE__ */ c.jsx(b.Badge, { variant: "warning", title: l("Saved changes visitors don't see yet"), children: l("Changes pending") })
  ] });
}
function os() {
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
function Pe(e) {
  return e === null ? [] : Array.isArray(e) ? e : [e];
}
function re(e, s, n) {
  return s && n !== null && e.length >= n;
}
function _e(e, s, n, r) {
  return n ? e.includes(s) ? e.filter((i) => i !== s) : re(e, n, r) ? e.slice() : [...e, s] : [s];
}
function Me(e) {
  return e.slice(0, -1);
}
function qe(e, s) {
  return s ? e.slice() : e[0] ?? null;
}
function ze(e, s, n, r = () => !1) {
  const i = s === "ArrowDown" || s === "Home" ? 1 : s === "ArrowUp" || s === "End" ? -1 : 0;
  if (i === 0 || n === 0) return e;
  let a = s === "Home" ? 0 : s === "End" ? n - 1 : e + i;
  for (s === "ArrowUp" && e === -1 && (a = n - 1); a >= 0 && a < n && r(a); ) a += i;
  return a >= 0 && a < n ? a : e;
}
function Ie(e, s) {
  const n = new Set(e.map((r) => r.id));
  return [...e, ...s.filter((r) => !n.has(r.id))];
}
function Re(e) {
  const s = [], n = {};
  for (const r of e)
    s.length = Math.min(s.length, r.depth), n[r.id] = s.slice(), s.push(r.label);
  return n;
}
function Y(e, s) {
  return [...s ?? [], e].join(" › ");
}
const Oe = u.createContext({});
function Be(e) {
  const s = e.termParents;
  return s && typeof s == "object" && !Array.isArray(s) ? s : {};
}
async function B(e, s) {
  const n = await fetch(`${ye("cms/terms/picker")}?${$e(e)}`, { headers: { Accept: "application/json" }, credentials: "same-origin", signal: s });
  if (!n.ok) throw new Error(String(n.status));
  return await n.json();
}
function is({ id: e, taxonomy: s, multiple: n, max: r, required: i, invalid: a, value: f, onChange: ce, placeholder: oe, except: k = null }) {
  const ie = u.useContext(Oe), ae = Be(we.usePage().props), h = Pe(f), [C, U] = u.useState(!1), [D, F] = u.useState(""), [m, V] = u.useState(null), [$, H] = u.useState(!1), [le, S] = u.useState(!1), [me, ue] = u.useState(0), [E, de] = u.useState({}), [d, T] = u.useState(-1), L = u.useRef(!1), P = u.useRef(null), G = u.useRef(null), _ = D.trim(), v = u.useCallback((t, o) => {
    const p = o ? Re(t) : {};
    de((y) => {
      const A = { ...y };
      for (const w of t) A[w.id] = { label: w.label, parents: p[w.id] ?? w.parents ?? y[w.id]?.parents };
      return A;
    });
  }, []), g = C && s ? _ : null;
  u.useEffect(() => {
    if (g === null || s === null || G.current === `${s}
${g}`) return;
    const t = new AbortController(), o = window.setTimeout(() => {
      B({ taxonomy: s, q: g, except: k }, t.signal).then((p) => {
        G.current = `${s}
${g}`, V({ ...p, q: g }), v(p.items, g === ""), T(g !== "" && p.items.length > 0 ? 0 : -1), S(!1);
      }).catch((p) => {
        p instanceof DOMException && p.name === "AbortError" || S(!0);
      });
    }, g === "" ? 0 : 250);
    return () => {
      window.clearTimeout(o), t.abort();
    };
  }, [s, g, k, me, v]);
  const Q = (t) => ie[String(t)] ?? E[t]?.label, M = h.filter((t) => Q(t) === void 0).join(",");
  u.useEffect(() => {
    !s || M === "" || B({ taxonomy: s, ids: M.split(",").map(Number) }).then((t) => v(t.items, !1)).catch(() => {
    });
  }, [s, M, v]);
  const q = () => {
    !s || !m?.more || $ || m.q !== _ || (H(!0), B({ taxonomy: s, q: m.q, offset: m.items.length, except: k }).then((t) => {
      const o = Ie(m.items, t.items);
      V({ items: o, more: t.more, q: m.q }), v(o, m.q === "");
    }).catch(() => S(!0)).finally(() => H(!1)));
  };
  if (u.useEffect(() => {
    d >= 0 && m && document.getElementById(`${e}-option-${m.items[d]?.id}`)?.scrollIntoView({ block: "nearest" });
  }, [d, e, m]), !s) return /* @__PURE__ */ c.jsx("p", { className: "cms:text-sm cms:text-muted-foreground", children: l("Choose a taxonomy for this field in its blueprint.") });
  const X = re(h, n, r), z = n || !i, I = (t) => ce(qe(t, n)), Z = (t) => {
    I(_e(h, t, n, r)), n || U(!1);
  }, x = m?.items ?? [], R = (t) => X && !h.includes(x[t]?.id ?? -1), O = (t) => Q(t) ?? l("Term #:id", { id: t }), fe = (t) => {
    t || F(""), U(t);
  }, pe = (t) => {
    if (t.key === "ArrowDown" || t.key === "ArrowUp") {
      t.preventDefault();
      const o = ze(d, t.key, x.length, R);
      t.key === "ArrowDown" && o === d && d === x.length - 1 && q(), T(o);
    } else if (t.key === "Enter") {
      t.preventDefault();
      const o = x[d];
      o && !R(d) && Z(o.id);
    } else t.key === "Backspace" && D === "" && z && h.length > 0 && (t.preventDefault(), I(Me(h)));
  }, he = (t) => {
    const o = t.currentTarget;
    o.scrollTop + o.clientHeight >= o.scrollHeight - 48 && q();
  }, ge = oe ?? (n ? l("Choose terms…") : l("Choose a term…")), J = `${e}-listbox`, W = m !== null && m.q !== _;
  let j;
  return le ? j = /* @__PURE__ */ c.jsxs("div", { className: "cms:flex cms:flex-col cms:items-start cms:gap-2 cms:p-3 cms:text-sm", children: [
    /* @__PURE__ */ c.jsx("p", { className: "cms:text-destructive", children: l("Terms could not be loaded.") }),
    /* @__PURE__ */ c.jsx(b.Button, { type: "button", variant: "outline", size: "sm", onClick: () => {
      S(!1), ue((t) => t + 1);
    }, children: l("Try again") })
  ] }) : m === null ? j = /* @__PURE__ */ c.jsx("div", { className: "cms:flex cms:flex-col cms:gap-2 cms:p-2", "aria-busy": "true", "aria-label": l("Loading terms"), children: [70, 55, 80, 45, 65].map((t) => /* @__PURE__ */ c.jsx(b.Skeleton, { className: "cms:h-5", style: { width: `${t}%` } }, t)) }) : x.length === 0 ? j = /* @__PURE__ */ c.jsx("p", { className: "cms:p-3 cms:text-sm cms:text-muted-foreground", children: m.q ? l("No terms match “:search”.", { search: m.q }) : l("Nothing to choose from yet.") }) : j = /* @__PURE__ */ c.jsxs("div", { className: `cms:max-h-72 cms:overflow-y-auto cms:overscroll-contain cms:p-1 ${W ? "cms:opacity-60" : ""}`, onScroll: he, children: [
    /* @__PURE__ */ c.jsx("div", { role: "listbox", id: J, "aria-label": l("Terms"), "aria-multiselectable": n || void 0, "aria-busy": W || void 0, children: x.map((t, o) => {
      const p = h.includes(t.id), y = R(o), A = Y(t.label, E[t.id]?.parents);
      return /* @__PURE__ */ c.jsxs(
        "div",
        {
          id: `${e}-option-${t.id}`,
          role: "option",
          "aria-selected": p,
          "aria-disabled": y || void 0,
          title: A,
          className: `cms:flex cms:cursor-default cms:items-center cms:gap-2 cms:rounded-sm cms:py-1.5 cms:pr-2 cms:text-sm cms:select-none ${o === d ? "cms:bg-accent cms:text-accent-foreground" : ""} ${y ? "cms:opacity-50" : ""}`,
          style: { paddingLeft: `${0.5 + Math.min(t.depth, 6) * 0.875}rem` },
          onMouseDown: (w) => w.preventDefault(),
          onMouseMove: () => {
            o !== d && T(o);
          },
          onClick: () => {
            y || Z(t.id);
          },
          children: [
            /* @__PURE__ */ c.jsx(ve, { className: `cms:size-4 cms:shrink-0 ${p ? "" : "cms:invisible"}`, "aria-hidden": "true" }),
            /* @__PURE__ */ c.jsx("span", { className: "cms:min-w-0 cms:truncate", children: t.label })
          ]
        },
        t.id
      );
    }) }),
    m.more && /* @__PURE__ */ c.jsx(b.Button, { type: "button", variant: "ghost", size: "sm", className: "cms:mt-1 cms:w-full", disabled: $, onMouseDown: (t) => t.preventDefault(), onClick: q, children: $ ? l("Loading…") : l("Load more") })
  ] }), /* @__PURE__ */ c.jsxs(b.Popover, { open: C, onOpenChange: fe, children: [
    /* @__PURE__ */ c.jsx(b.PopoverAnchor, { asChild: !0, children: /* @__PURE__ */ c.jsxs(
      "div",
      {
        "data-terms-box": "",
        onPointerDownCapture: () => {
          L.current = !0;
        },
        onClickCapture: () => {
          setTimeout(() => {
            L.current = !1;
          }, 0);
        },
        "data-invalid": a || void 0,
        className: "cms:flex cms:w-full cms:max-w-xl cms:min-w-0 cms:[contain:inline-size] cms:flex-wrap cms:items-center cms:gap-1 cms:rounded-md cms:border cms:border-input/80 cms:bg-card cms:p-1 cms:shadow-xs cms:data-invalid:border-destructive cms:dark:bg-input/20",
        children: [
          h.map((t) => /* @__PURE__ */ c.jsxs(
            "span",
            {
              title: Y(O(t), E[t]?.parents ?? ae[String(t)]),
              className: "cms:inline-flex cms:h-7 cms:max-w-full cms:min-w-0 cms:items-center cms:gap-0.5 cms:rounded-sm cms:bg-secondary cms:pl-2 cms:text-xs cms:font-medium cms:text-secondary-foreground",
              children: [
                /* @__PURE__ */ c.jsx("span", { className: `cms:min-w-0 cms:truncate ${z ? "" : "cms:pr-2"}`, children: O(t) }),
                z && /* @__PURE__ */ c.jsx(
                  "button",
                  {
                    type: "button",
                    className: "cms:inline-flex cms:size-7 cms:shrink-0 cms:items-center cms:justify-center cms:rounded-sm cms:text-muted-foreground cms:hover:bg-muted cms:hover:text-foreground cms:focus-visible:ring-2 cms:focus-visible:ring-ring cms:focus-visible:outline-none",
                    "aria-label": l("Remove :term", { term: O(t) }),
                    onMouseDown: (o) => {
                      C && o.preventDefault();
                    },
                    onClick: () => {
                      I(h.filter((o) => o !== t)), C && P.current?.focus();
                    },
                    children: /* @__PURE__ */ c.jsx(Ce, { className: "cms:size-3", "aria-hidden": "true" })
                  }
                )
              ]
            },
            t
          )),
          /* @__PURE__ */ c.jsx(b.PopoverTrigger, { asChild: !0, children: /* @__PURE__ */ c.jsxs(
            "button",
            {
              id: e,
              type: "button",
              "aria-haspopup": "listbox",
              "aria-invalid": a || void 0,
              className: "cms:flex cms:h-7 cms:min-w-24 cms:flex-1 cms:items-center cms:justify-between cms:gap-1 cms:rounded-sm cms:px-2 cms:text-left cms:text-sm cms:text-muted-foreground cms:hover:bg-muted cms:focus-visible:ring-2 cms:focus-visible:ring-ring cms:focus-visible:outline-none cms:disabled:pointer-events-none cms:disabled:opacity-50",
              children: [
                /* @__PURE__ */ c.jsx("span", { className: "cms:truncate", children: h.length === 0 ? ge : n ? l("Add…") : l("Change…") }),
                /* @__PURE__ */ c.jsx(Ne, { className: "cms:size-4 cms:shrink-0 cms:opacity-60", "aria-hidden": "true" })
              ]
            }
          ) })
        ]
      }
    ) }),
    /* @__PURE__ */ c.jsxs(
      b.PopoverContent,
      {
        side: "bottom",
        align: "start",
        sideOffset: 4,
        avoidCollisions: !1,
        className: "cms:max-w-[calc(100vw-2rem)] cms:p-0",
        style: { width: "var(--radix-popper-anchor-width)" },
        onInteractOutside: (t) => {
          (L.current || t.target instanceof Element && t.target.closest("[data-terms-box]")) && t.preventDefault();
        },
        onFocusOutside: (t) => {
          const o = t.target;
          (!(o instanceof Element) || o === document.body || o.closest("[data-terms-box]")) && t.preventDefault();
        },
        onOpenAutoFocus: (t) => {
          t.preventDefault(), P.current?.focus();
        },
        children: [
          /* @__PURE__ */ c.jsxs("div", { className: "cms:relative cms:border-b cms:border-border/60", children: [
            /* @__PURE__ */ c.jsx(je, { className: "cms:pointer-events-none cms:absolute cms:top-1/2 cms:left-3 cms:size-4 cms:-translate-y-1/2 cms:text-muted-foreground", "aria-hidden": "true" }),
            /* @__PURE__ */ c.jsx(
              "input",
              {
                ref: P,
                type: "text",
                role: "combobox",
                "aria-expanded": "true",
                "aria-controls": J,
                "aria-autocomplete": "list",
                "aria-label": l("Search terms"),
                "aria-activedescendant": d >= 0 && x[d] ? `${e}-option-${x[d].id}` : void 0,
                className: "cms:h-10 cms:w-full cms:bg-transparent cms:pr-3 cms:pl-9 cms:text-sm cms:outline-none cms:placeholder:text-muted-foreground",
                placeholder: l("Search terms"),
                autoComplete: "off",
                value: D,
                onKeyDown: pe,
                onChange: (t) => F(t.target.value)
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
  os as C,
  cs as E,
  ne as L,
  is as T,
  Ce as X,
  Oe as a,
  Ne as b,
  K as c,
  Qe as d,
  Ge as e,
  Je as f,
  Xe as g,
  ns as h,
  Se as i,
  rs as j,
  N as k,
  Ee as l,
  ts as m,
  We as n,
  Ze as o,
  Te as p,
  Ye as q,
  es as r,
  ss as s,
  $e as t
};
