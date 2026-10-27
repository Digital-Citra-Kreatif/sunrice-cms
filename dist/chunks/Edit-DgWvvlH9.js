import { j as e, a as u, t as l, r as p, l as d } from "./admin-DwAcAKS1.js";
import { u as r } from "./ui-Dh5wfMwT.js";
import { l as L, F as T } from "./languages-CQhy0zWb.js";
import { V as E } from "./VersionConflict-BMdejaJy.js";
import { B as K } from "./FieldInput-uASPBW6i.js";
import { L as V } from "./loader-circle-ByksABXO.js";
import { S as $ } from "./settings-2-0VUe76YZ.js";
function M(t) {
  return /* @__PURE__ */ e.jsx(B, { ...t }, `${t.locale}:${t.version}:${JSON.stringify(t.values)}`);
}
function B({ set: t, fields: b, locale: c, locales: f, shared: N, values: x, version: v, can: j, settings: y }) {
  const g = u(`cms/globals/${t.handle}/values`);
  r.useBreadcrumbs([{ label: l("Globals"), href: u("cms/globals") }, { label: t.title }]);
  const a = p.useForm({ locale: c, data: x, version: v }), h = a.errors, S = (s) => {
    const n = K(h, s);
    n.length > 0 && a.clearErrors(...n);
  }, i = f[0], o = r.useEditLock({
    type: "cms.global",
    id: t.id,
    locale: c,
    enabled: j.update,
    noun: l("global set"),
    leaveTo: u("cms/globals"),
    getUnsaved: () => a.isDirty ? { data: a.data.data } : null
  }), m = j.update && !o.readOnly, k = () => a.processing || a.put(g, { preserveScroll: !0 }), w = () => {
    a.transform((s) => ({ ...s, version: null })), a.put(g, { preserveScroll: !0 });
  }, D = async (s) => {
    const n = await o.loadKept(s);
    n.data && typeof n.data == "object" && a.setData("data", n.data);
  };
  return r.useUnsavedChanges(a.isDirty && !o.takenOver, m ? k : void 0), /* @__PURE__ */ e.jsxs("form", { noValidate: !0, onSubmit: (s) => {
    s.preventDefault(), k();
  }, className: "cms:flex cms:max-w-5xl cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(p.Head, { title: t.title }),
    o.dialogs,
    /* @__PURE__ */ e.jsx(
      r.PageHeader,
      {
        title: t.title,
        menu: y ? [{ label: l("Settings"), href: y, icon: /* @__PURE__ */ e.jsx($, {}) }] : [],
        back: { href: u("cms/globals"), label: l("Back to globals") },
        actions: /* @__PURE__ */ e.jsx(e.Fragment, { children: m && /* @__PURE__ */ e.jsxs(r.Button, { type: "submit", disabled: a.processing, children: [
          a.processing && /* @__PURE__ */ e.jsx(V, { className: "cms:animate-spin" }),
          " ",
          l("Save")
        ] }) }),
        children: a.isDirty && /* @__PURE__ */ e.jsx("span", { className: "cms:text-sm cms:text-muted-foreground", children: l("Unsaved changes") })
      }
    ),
    /* @__PURE__ */ e.jsx(r.LanguageTabs, { value: c, languages: L(f, null, d), onValueChange: (s) => p.router.get(g, { locale: s }) }),
    b.length === 0 ? /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: l("This global set has no fields: choose a blueprint for it in its Settings.") }) : /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-4", children: [
      /* @__PURE__ */ e.jsx(r.ViewingNotice, { by: o.viewingBy, onTakeOver: o.requestTakeOver }),
      i && c !== i && /* @__PURE__ */ e.jsx("p", { className: "cms:rounded-lg cms:border cms:bg-muted/40 cms:p-3 cms:text-sm cms:text-muted-foreground", role: "note", children: v === null ? l("Not saved in :language yet: these are the :main values, which the site shows meanwhile. Translate them, then save.", { language: d(c), main: d(i) }) : l("A field left empty shows the :main value on the site.", { main: d(i) }) }),
      /* @__PURE__ */ e.jsx(E, { message: h.version, processing: a.processing, onSaveMine: w }),
      /* @__PURE__ */ e.jsx(r.KeptEditsNotice, { kept: o.kept, disabled: !m, onLoad: (s) => {
        D(s);
      }, onDiscard: (s) => {
        o.discardKept(s);
      } }),
      /* @__PURE__ */ e.jsx(
        T,
        {
          disabled: !m,
          fields: b,
          values: a.data.data,
          errors: h,
          storageKey: `cms:global:${t.handle}`,
          shared: N,
          sharedValues: x,
          mainLanguage: i ? d(i) : null,
          onChange: (s, n) => {
            a.setData("data", { ...a.data.data, [s]: n }), S(`data.${s}`);
          }
        }
      )
    ] })
  ] });
}
export {
  M as default
};
