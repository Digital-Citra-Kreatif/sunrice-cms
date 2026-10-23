import { r as t, j as r, t as i, a as n } from "./admin-BrOs4B--.js";
import { F as o } from "./FieldError-36ltLu3Y.js";
import { S as a } from "./StructureList-7wuZG7Uh.js";
function p({ blueprints: e }) {
  const s = t.usePage().props.errors;
  return /* @__PURE__ */ r.jsxs(r.Fragment, { children: [
    /* @__PURE__ */ r.jsx(o, { message: s.blueprint }),
    /* @__PURE__ */ r.jsx(
      a,
      {
        kind: "blueprint",
        base: n("cms/blueprints"),
        rows: e,
        intro: i("The fields editors fill in, for each kind of content.")
      }
    )
  ] });
}
export {
  p as default
};
