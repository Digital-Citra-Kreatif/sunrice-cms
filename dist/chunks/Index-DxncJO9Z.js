import { r as t, j as r, t as i, a as n } from "./admin-BXp1g0Oh.js";
import { F as o } from "./FieldError-Cn9v3eQ-.js";
import { S as a } from "./StructureList-BwhfMluL.js";
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
