import { j as e, a as u, t as r, r as b, l as d } from "./admin-DnUS3JhT.js";
import { u as n } from "./ui-Dh5wfMwT.js";
import { l as L, F as T } from "./languages-C7LCqnet.js";
import { V as E } from "./VersionConflict-BHxwc6ZP.js";
import { B as K } from "./FieldInput-rGeU_i8L.js";
import { U as V } from "./UnsavedNote-D4w1iX8O.js";
import { L as $ } from "./loader-circle-ByksABXO.js";
import { S as B } from "./settings-2-0VUe76YZ.js";
function q(t) {
  return /* @__PURE__ */ e.jsx(C, { ...t }, `${t.locale}:${t.version}:${JSON.stringify(t.values)}`);
}
function C({ set: t, fields: f, locale: c, locales: h, shared: N, values: v, version: x, can: j, settings: y }) {
  const g = u(`cms/globals/${t.handle}/values`);
  n.useBreadcrumbs([{ label: r("Globals"), href: u("cms/globals") }, { label: t.title }]);
  const a = b.useForm({ locale: c, data: v, version: x }), p = a.errors, S = (s) => {
    const o = K(p, s);
    o.length > 0 && a.clearErrors(...o);
  }, i = h[0], l = n.useEditLock({
    type: "cms.global",
    id: t.id,
    locale: c,
    enabled: j.update,
    noun: r("global set"),
    leaveTo: u("cms/globals"),
    getUnsaved: () => a.isDirty ? { data: a.data.data } : null
  }), m = j.update && !l.readOnly, k = () => a.processing || a.put(g, { preserveScroll: !0 }), w = () => {
    a.transform((s) => ({ ...s, version: null })), a.put(g, { preserveScroll: !0 });
  }, D = async (s) => {
    const o = await l.loadKept(s);
    o.data && typeof o.data == "object" && a.setData("data", o.data);
  };
  return n.useUnsavedChanges(a.isDirty && !l.takenOver, m ? k : void 0), /* @__PURE__ */ e.jsxs("form", { noValidate: !0, onSubmit: (s) => {
    s.preventDefault(), k();
  }, className: "cms:flex cms:max-w-5xl cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(b.Head, { title: t.title }),
    l.dialogs,
    /* @__PURE__ */ e.jsx(
      n.PageHeader,
      {
        title: t.title,
        menu: y ? [{ label: r("Settings"), href: y, icon: /* @__PURE__ */ e.jsx(B, {}) }] : [],
        back: { href: u("cms/globals"), label: r("Back to globals") },
        actions: /* @__PURE__ */ e.jsx(e.Fragment, { children: m && /* @__PURE__ */ e.jsxs(n.Button, { type: "submit", disabled: a.processing, children: [
          a.processing && /* @__PURE__ */ e.jsx($, { className: "cms:animate-spin" }),
          " ",
          r("Save")
        ] }) }),
        children: /* @__PURE__ */ e.jsx(V, { dirty: a.isDirty })
      }
    ),
    /* @__PURE__ */ e.jsx(n.LanguageTabs, { value: c, languages: L(h, null, d), onValueChange: (s) => b.router.get(g, { locale: s }) }),
    f.length === 0 ? /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: r("This global set has no fields: choose a blueprint for it in its Settings.") }) : /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-4", children: [
      /* @__PURE__ */ e.jsx(n.ViewingNotice, { by: l.viewingBy, onTakeOver: l.requestTakeOver }),
      i && c !== i && /* @__PURE__ */ e.jsx("p", { className: "cms:rounded-lg cms:border cms:bg-muted/40 cms:p-3 cms:text-sm cms:text-muted-foreground", role: "note", children: x === null ? r("Not saved in :language yet: these are the :main values, which the site shows meanwhile. Translate them, then save.", { language: d(c), main: d(i) }) : r("A field left empty shows the :main value on the site.", { main: d(i) }) }),
      /* @__PURE__ */ e.jsx(E, { message: p.version, processing: a.processing, onSaveMine: w }),
      /* @__PURE__ */ e.jsx(n.KeptEditsNotice, { kept: l.kept, disabled: !m, onLoad: (s) => {
        D(s);
      }, onDiscard: (s) => {
        l.discardKept(s);
      } }),
      /* @__PURE__ */ e.jsx(
        T,
        {
          disabled: !m,
          fields: f,
          values: a.data.data,
          errors: p,
          storageKey: `cms:global:${t.handle}`,
          shared: N,
          sharedValues: v,
          mainLanguage: i ? d(i) : null,
          onChange: (s, o) => {
            a.setData("data", { ...a.data.data, [s]: o }), S(`data.${s}`);
          }
        }
      )
    ] })
  ] });
}
export {
  q as default
};
