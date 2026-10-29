import { t as s, j as e, r as a } from "./admin-tiVz_6M3.js";
import { u as l } from "./ui-Dh5wfMwT.js";
import { u as o, T as u } from "./Confirm-n17IwOM3.js";
import { P as j } from "./plus-COqahUZ2.js";
function N({ kind: d, base: c, rows: n, intro: m }) {
  const i = d === "blueprint", r = i ? s("Blueprints") : s("Fieldsets");
  l.useBreadcrumbs([{ label: r }]);
  const [x, h] = o();
  return /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(a.Head, { title: r }),
    h,
    /* @__PURE__ */ e.jsx(l.PageHeader, { title: r, description: m, actions: /* @__PURE__ */ e.jsx(l.Button, { asChild: !0, children: /* @__PURE__ */ e.jsxs(a.Link, { href: `${c}/create`, children: [
      /* @__PURE__ */ e.jsx(j, {}),
      " ",
      i ? s("New blueprint") : s("New fieldset")
    ] }) }) }),
    /* @__PURE__ */ e.jsx(l.Card, { className: "cms:py-0", children: /* @__PURE__ */ e.jsxs(l.Table, { children: [
      /* @__PURE__ */ e.jsx(l.TableHeader, { children: /* @__PURE__ */ e.jsxs(l.TableRow, { children: [
        /* @__PURE__ */ e.jsx(l.TableHead, { children: s("Title") }),
        /* @__PURE__ */ e.jsx(l.TableHead, { children: s("Handle") }),
        /* @__PURE__ */ e.jsx(l.TableHead, { children: s("Fields") }),
        n.some((t) => t.usedBy) && /* @__PURE__ */ e.jsx(l.TableHead, { children: s("Used by") }),
        /* @__PURE__ */ e.jsx(l.TableHead, { className: "cms:w-12", children: /* @__PURE__ */ e.jsx("span", { className: "cms:sr-only", children: s("Actions") }) })
      ] }) }),
      /* @__PURE__ */ e.jsxs(l.TableBody, { children: [
        n.length === 0 && /* @__PURE__ */ e.jsx(l.TableRow, { children: /* @__PURE__ */ e.jsx(l.TableCell, { colSpan: 5, className: "cms:py-8 cms:text-center cms:text-muted-foreground", children: i ? s("No blueprints yet.") : s("No fieldsets yet.") }) }),
        n.map((t) => /* @__PURE__ */ e.jsxs(l.TableRow, { children: [
          /* @__PURE__ */ e.jsx(l.TableCell, { children: /* @__PURE__ */ e.jsx(a.Link, { href: `${c}/${t.handle}/edit`, className: "cms:font-medium cms:hover:underline", children: t.title }) }),
          /* @__PURE__ */ e.jsx(l.TableCell, { children: /* @__PURE__ */ e.jsx("code", { className: "cms:text-xs", children: t.handle }) }),
          /* @__PURE__ */ e.jsx(l.TableCell, { children: t.fields }),
          t.usedBy && /* @__PURE__ */ e.jsx(l.TableCell, { className: "cms:min-w-64 cms:whitespace-normal cms:text-muted-foreground", children: t.usedBy.join(", ") || "—" }),
          /* @__PURE__ */ e.jsx(l.TableCell, { children: /* @__PURE__ */ e.jsx(
            l.Button,
            {
              variant: "ghost",
              size: "icon",
              className: "cms:size-8 cms:text-destructive",
              "aria-label": s("Delete :title", { title: t.title }),
              onClick: () => x(
                i ? s('Delete the blueprint ":title"? Content keeps its values.', { title: t.title }) : s('Delete the fieldset ":title"? Content keeps its values.', { title: t.title }),
                () => a.router.delete(`${c}/${t.handle}`, { preserveScroll: !0 })
              ),
              children: /* @__PURE__ */ e.jsx(u, {})
            }
          ) })
        ] }, t.id))
      ] })
    ] }) })
  ] });
}
export {
  N as S
};
