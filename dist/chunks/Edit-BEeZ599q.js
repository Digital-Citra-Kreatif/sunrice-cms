import { j as e, a as u, t as l, r as f, l as d } from "./admin-tiVz_6M3.js";
import { u as n } from "./ui-Dh5wfMwT.js";
import { l as D, F as E } from "./languages-C4XQ135u.js";
import { V as K } from "./VersionConflict-CmQLCF6Q.js";
import { A as V } from "./FieldInput-BeYhr3dZ.js";
import { U as $ } from "./UnsavedNote-DQcq9GgZ.js";
import { L as C } from "./loader-circle-ByksABXO.js";
import { S as O } from "./settings-2-0VUe76YZ.js";
import { L as U } from "./layout-template-RwJXNfEY.js";
function z(t) {
  return /* @__PURE__ */ e.jsx(A, { ...t }, `${t.locale}:${t.version}:${JSON.stringify(t.values)}`);
}
function A({ set: t, fields: b, locale: c, locales: h, shared: S, values: x, version: v, can: j, settings: y = null, blueprint: k = null }) {
  const g = u(`cms/globals/${t.handle}/values`);
  n.useBreadcrumbs([{ label: l("Globals"), href: u("cms/globals") }, { label: t.title }]);
  const a = f.useForm({ locale: c, data: x, version: v }), p = a.errors, w = (s) => {
    const r = V(p, s);
    r.length > 0 && a.clearErrors(...r);
  }, i = h[0], o = n.useEditLock({
    type: "cms.global",
    id: t.id,
    locale: c,
    enabled: j.update,
    noun: l("global set"),
    leaveTo: u("cms/globals"),
    getUnsaved: () => a.isDirty ? { data: a.data.data } : null
  }), m = j.update && !o.readOnly, N = () => a.processing || a.put(g, { preserveScroll: !0 }), L = () => {
    a.transform((s) => ({ ...s, version: null })), a.put(g, { preserveScroll: !0 });
  }, T = async (s) => {
    const r = await o.loadKept(s);
    r.data && typeof r.data == "object" && a.setData("data", r.data);
  };
  return n.useUnsavedChanges(a.isDirty && !o.takenOver, m ? N : void 0), /* @__PURE__ */ e.jsxs("form", { noValidate: !0, onSubmit: (s) => {
    s.preventDefault(), N();
  }, className: "cms:flex cms:max-w-5xl cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(f.Head, { title: t.title }),
    o.dialogs,
    /* @__PURE__ */ e.jsx(
      n.PageHeader,
      {
        title: t.title,
        menu: [
          ...y ? [{ label: l("Settings"), href: y, icon: /* @__PURE__ */ e.jsx(O, {}) }] : [],
          ...k ? [{ label: l("Edit blueprint"), href: k, icon: /* @__PURE__ */ e.jsx(U, {}) }] : []
        ],
        back: { href: u("cms/globals"), label: l("Back to globals") },
        actions: /* @__PURE__ */ e.jsx(e.Fragment, { children: m && /* @__PURE__ */ e.jsxs(n.Button, { type: "submit", disabled: a.processing, children: [
          a.processing && /* @__PURE__ */ e.jsx(C, { className: "cms:animate-spin" }),
          " ",
          l("Save")
        ] }) }),
        children: /* @__PURE__ */ e.jsx($, { dirty: a.isDirty })
      }
    ),
    /* @__PURE__ */ e.jsx(n.LanguageTabs, { value: c, languages: D(h, null, d), onValueChange: (s) => f.router.get(g, { locale: s }) }),
    b.length === 0 ? /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: l("This global set has no fields: choose a blueprint for it in its Settings.") }) : /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-4", children: [
      /* @__PURE__ */ e.jsx(n.ViewingNotice, { by: o.viewingBy, onTakeOver: o.requestTakeOver }),
      i && c !== i && /* @__PURE__ */ e.jsx("p", { className: "cms:rounded-lg cms:border cms:bg-muted/40 cms:p-3 cms:text-sm cms:text-muted-foreground", role: "note", children: v === null ? l("Not saved in :language yet: these are the :main values, which the site shows meanwhile. Translate them, then save.", { language: d(c), main: d(i) }) : l("A field left empty shows the :main value on the site.", { main: d(i) }) }),
      /* @__PURE__ */ e.jsx(K, { message: p.version, processing: a.processing, onSaveMine: L }),
      /* @__PURE__ */ e.jsx(n.KeptEditsNotice, { kept: o.kept, disabled: !m, onLoad: (s) => {
        T(s);
      }, onDiscard: (s) => {
        o.discardKept(s);
      } }),
      /* @__PURE__ */ e.jsx(
        E,
        {
          disabled: !m,
          fields: b,
          values: a.data.data,
          errors: p,
          storageKey: `cms:global:${t.handle}`,
          shared: S,
          sharedValues: x,
          mainLanguage: i ? d(i) : null,
          onChange: (s, r) => {
            a.setData("data", { ...a.data.data, [s]: r }), w(`data.${s}`);
          }
        }
      )
    ] })
  ] });
}
export {
  z as default
};
