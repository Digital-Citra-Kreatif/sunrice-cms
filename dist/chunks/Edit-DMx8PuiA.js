import { j as e, a as g, t as l, r as b, l as c } from "./admin-C3qsRD_x.js";
import { u as o } from "./ui-Dh5wfMwT.js";
import { l as T, F as E } from "./languages-B1xHHPmU.js";
import { V as K } from "./VersionConflict-hiVSqsb8.js";
import { B as L } from "./FieldInput-CBk3lvnW.js";
import { L as V } from "./loader-circle-ByksABXO.js";
import { S as $ } from "./settings-2-0VUe76YZ.js";
function M(t) {
  return /* @__PURE__ */ e.jsx(B, { ...t }, `${t.locale}:${t.version}:${JSON.stringify(t.values)}`);
}
function B({ set: t, fields: f, locale: d, locales: p, shared: N, values: x, version: v, can: j, settings: y }) {
  const u = g(`cms/globals/${t.handle}/values`);
  o.useBreadcrumbs([{ label: l("Globals"), href: g("cms/globals") }, { label: t.title }]);
  const a = b.useForm({ locale: d, data: x, version: v }), h = a.errors, k = (s) => {
    const n = L(h, s);
    n.length > 0 && a.clearErrors(...n);
  }, i = p[0], r = o.useEditLock({
    type: "cms.global",
    id: t.id,
    locale: d,
    enabled: j.update,
    noun: l("global set"),
    leaveTo: g("cms/globals"),
    getUnsaved: () => a.isDirty ? { data: a.data.data } : null
  }), m = j.update && !r.readOnly, S = () => a.processing || a.put(u, { preserveScroll: !0 }), w = () => {
    a.transform((s) => ({ ...s, version: null })), a.put(u, { preserveScroll: !0 });
  }, D = async (s) => {
    const n = await r.loadKept(s);
    n.data && typeof n.data == "object" && a.setData("data", n.data);
  };
  return o.useUnsavedChanges(a.isDirty && !r.takenOver, m ? S : void 0), /* @__PURE__ */ e.jsxs("form", { noValidate: !0, onSubmit: (s) => {
    s.preventDefault(), S();
  }, className: "cms:flex cms:max-w-5xl cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(b.Head, { title: t.title }),
    r.dialogs,
    /* @__PURE__ */ e.jsx(
      o.PageHeader,
      {
        title: t.title,
        menu: y ? [{ label: l("Settings"), href: y, icon: /* @__PURE__ */ e.jsx($, {}) }] : [],
        back: { href: g("cms/globals"), label: l("Back to globals") },
        actions: /* @__PURE__ */ e.jsx(e.Fragment, { children: m && /* @__PURE__ */ e.jsxs(o.Button, { type: "submit", disabled: a.processing, children: [
          a.processing && /* @__PURE__ */ e.jsx(V, { className: "cms:animate-spin" }),
          " ",
          l("Save")
        ] }) }),
        children: a.isDirty && /* @__PURE__ */ e.jsx("span", { className: "cms:text-sm cms:text-muted-foreground", children: l("Unsaved changes") })
      }
    ),
    /* @__PURE__ */ e.jsx(o.LanguageTabs, { value: d, languages: T(p, null, c), onValueChange: (s) => b.router.get(u, { locale: s }) }),
    f.length === 0 ? /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: l("This global set has no fields: choose a blueprint for it in its Settings.") }) : /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-4", children: [
      /* @__PURE__ */ e.jsx(o.ViewingNotice, { by: r.viewingBy, onTakeOver: r.requestTakeOver }),
      i && d !== i && /* @__PURE__ */ e.jsx("p", { className: "cms:rounded-lg cms:border cms:bg-muted/40 cms:p-3 cms:text-sm cms:text-muted-foreground", role: "note", children: v === null ? l("Not saved in :language yet: these are the :main values, which the site shows meanwhile. Translate them, then save.", { language: c(d), main: c(i) }) : l("A field left empty shows the :main value on the site.", { main: c(i) }) }),
      /* @__PURE__ */ e.jsx(K, { message: h.version, processing: a.processing, onSaveMine: w }),
      /* @__PURE__ */ e.jsx(o.KeptEditsNotice, { kept: r.kept, disabled: !m, onLoad: (s) => {
        D(s);
      }, onDiscard: (s) => {
        r.discardKept(s);
      } }),
      /* @__PURE__ */ e.jsx(
        E,
        {
          disabled: !m,
          fields: f,
          values: a.data.data,
          errors: h,
          storageKey: `cms:global:${t.handle}`,
          shared: N,
          sharedValues: x,
          sharedNote: i ? l("Shared by all languages: the greyed-out fields are edited in :language.", { language: c(i) }) : l("Shared by all languages: the greyed-out fields are edited in the main language."),
          onChange: (s, n) => {
            a.setData("data", { ...a.data.data, [s]: n }), k(`data.${s}`);
          }
        }
      )
    ] })
  ] });
}
export {
  M as default
};
