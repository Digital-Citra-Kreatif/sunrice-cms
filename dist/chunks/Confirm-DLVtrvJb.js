import { c as u, _ as d, u as e } from "./ui-BzV6lfEf.js";
import { j as n, t as i } from "./admin-DO6X19YK.js";
const s = {
  name: "trash",
  size: 24,
  node: [
    ["path", { d: "M10 11v6", key: "nco0om" }],
    ["path", { d: "M14 11v6", key: "outv1u" }],
    ["path", { d: "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6", key: "miytrc" }],
    ["path", { d: "M3 6h18", key: "d0wm0j" }],
    ["path", { d: "M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2", key: "e791ji" }]
  ],
  aliases: ["trash-2"]
};
s.node;
const j = u(s);
function m() {
  const [t, a] = d.useState(null), l = /* @__PURE__ */ n.jsx(e.Dialog, { open: t !== null, onOpenChange: (o) => !o && a(null), children: /* @__PURE__ */ n.jsxs(e.DialogContent, { children: [
    /* @__PURE__ */ n.jsxs(e.DialogHeader, { children: [
      /* @__PURE__ */ n.jsx(e.DialogTitle, { children: i("Are you sure?") }),
      /* @__PURE__ */ n.jsx(e.DialogDescription, { children: t?.message })
    ] }),
    /* @__PURE__ */ n.jsxs(e.DialogFooter, { children: [
      /* @__PURE__ */ n.jsx(e.Button, { type: "button", variant: "outline", onClick: () => a(null), children: i("Cancel") }),
      /* @__PURE__ */ n.jsx(e.Button, { type: "button", variant: "destructive", onClick: () => {
        t?.onConfirm(), a(null);
      }, children: t?.label ?? i("Delete") })
    ] })
  ] }) });
  return [(o, r, c = "Delete") => a({ message: o, onConfirm: r, label: c }), l];
}
export {
  j as T,
  m as u
};
