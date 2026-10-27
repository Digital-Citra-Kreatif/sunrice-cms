import { r as t, j as e, t as i, a as o } from "./admin-DnUS3JhT.js";
import { F as a } from "./FieldError-0lRA6b_a.js";
import { S as d } from "./StructureList-DHm1g7LV.js";
function m({ fieldsets: s }) {
  const r = t.usePage().props.errors;
  return /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
    /* @__PURE__ */ e.jsx(a, { message: r.fieldset }),
    /* @__PURE__ */ e.jsx(
      d,
      {
        kind: "fieldset",
        base: o("cms/fieldsets"),
        rows: s,
        intro: i("Fields shared between blueprints, and the kinds of block of flexible fields.")
      }
    )
  ] });
}
export {
  m as default
};
