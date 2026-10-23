import { j as e, t as o } from "./admin-CBkX-z7V.js";
import { _ as u } from "./createLucideIcon-Ccbp7F45.js";
import { u as n } from "./ui-Dh5wfMwT.js";
function h() {
  const [t, i] = u.useState(null), r = /* @__PURE__ */ e.jsx(n.Dialog, { open: t !== null, onOpenChange: (l) => !l && i(null), children: /* @__PURE__ */ e.jsxs(n.DialogContent, { children: [
    /* @__PURE__ */ e.jsxs(n.DialogHeader, { children: [
      /* @__PURE__ */ e.jsx(n.DialogTitle, { children: o("Are you sure?") }),
      /* @__PURE__ */ e.jsx(n.DialogDescription, { children: t?.message })
    ] }),
    /* @__PURE__ */ e.jsxs(n.DialogFooter, { children: [
      /* @__PURE__ */ e.jsx(n.Button, { type: "button", variant: "outline", onClick: () => i(null), children: o("Cancel") }),
      /* @__PURE__ */ e.jsx(n.Button, { type: "button", variant: "destructive", onClick: () => {
        t?.onConfirm(), i(null);
      }, children: t?.label ?? o("Delete") })
    ] })
  ] }) });
  return [(l, s, a = "Delete") => i({ message: l, onConfirm: s, label: a }), r];
}
export {
  h as u
};
