import { r as t, j as r, t as i, a as n } from "./admin-CtU9_6Av.js";
import { F as o } from "./FieldError-Bao8rVy4.js";
import { S as a } from "./StructureList-DZ5jyv4K.js";
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
