import { j as e, a as g, t, r as p, l as d } from "./admin-AwfaNzsU.js";
import { u as l } from "./ui-Dh5wfMwT.js";
import { F as V } from "./FieldSections-BKp60Le6.js";
import { V as $ } from "./VersionConflict-dXud_KBL.js";
import { y as C } from "./FieldInput-CXFpAw9T.js";
import { L as E } from "./loader-circle-ByksABXO.js";
import { S as K } from "./settings-2-0VUe76YZ.js";
function H(r) {
  return /* @__PURE__ */ e.jsx(L, { ...r }, `${r.locale}:${r.version}:${JSON.stringify(r.values)}`);
}
function L({ set: r, fields: x, locale: c, locales: u, shared: N, values: b, version: v, can: j, settings: y }) {
  const h = g(`cms/globals/${r.handle}/values`);
  l.useBreadcrumbs([{ label: t("Globals"), href: g("cms/globals") }, { label: r.title }]);
  const s = p.useForm({ locale: c, data: b, version: v }), f = s.errors, k = (a) => {
    const n = C(f, a);
    n.length > 0 && s.clearErrors(...n);
  }, o = u[0], i = l.useEditLock({
    type: "cms.global",
    id: r.id,
    locale: c,
    enabled: j.update,
    noun: t("global set"),
    leaveTo: g("cms/globals"),
    getUnsaved: () => s.isDirty ? { data: s.data.data } : null
  }), m = j.update && !i.readOnly, S = () => s.processing || s.put(h, { preserveScroll: !0 }), w = () => {
    s.transform((a) => ({ ...a, version: null })), s.put(h, { preserveScroll: !0 });
  }, D = async (a) => {
    const n = await i.loadKept(a);
    n.data && typeof n.data == "object" && s.setData("data", n.data);
  };
  return l.useUnsavedChanges(s.isDirty && !i.takenOver, m ? S : void 0), /* @__PURE__ */ e.jsxs("form", { noValidate: !0, onSubmit: (a) => {
    a.preventDefault(), S();
  }, className: "cms:flex cms:max-w-5xl cms:flex-col cms:gap-6", children: [
    /* @__PURE__ */ e.jsx(p.Head, { title: r.title }),
    i.dialogs,
    /* @__PURE__ */ e.jsx(
      l.PageHeader,
      {
        title: r.title,
        menu: y ? [{ label: t("Settings"), href: y, icon: /* @__PURE__ */ e.jsx(K, {}) }] : [],
        back: { href: g("cms/globals"), label: t("Back to globals") },
        actions: /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
          u.length > 1 && /* @__PURE__ */ e.jsxs(l.Select, { value: c, onValueChange: (a) => p.router.get(h, { locale: a }), children: [
            /* @__PURE__ */ e.jsx(l.SelectTrigger, { className: "cms:w-48", "aria-label": t("Language"), children: /* @__PURE__ */ e.jsx(l.SelectValue, {}) }),
            /* @__PURE__ */ e.jsx(l.SelectContent, { children: u.map((a, n) => /* @__PURE__ */ e.jsxs(l.SelectItem, { value: a, children: [
              d(a),
              n === 0 ? ` ${t("(main)")}` : ""
            ] }, a)) })
          ] }),
          m && /* @__PURE__ */ e.jsxs(l.Button, { type: "submit", disabled: s.processing, children: [
            s.processing && /* @__PURE__ */ e.jsx(E, { className: "cms:animate-spin" }),
            " ",
            t("Save")
          ] })
        ] }),
        children: s.isDirty && /* @__PURE__ */ e.jsx("span", { className: "cms:text-sm cms:text-muted-foreground", children: t("Unsaved changes") })
      }
    ),
    x.length === 0 ? /* @__PURE__ */ e.jsx("p", { className: "cms:text-muted-foreground", children: t("This global set has no fields: choose a blueprint for it in its Settings.") }) : /* @__PURE__ */ e.jsxs("div", { className: "cms:flex cms:flex-col cms:gap-4", children: [
      /* @__PURE__ */ e.jsx(l.ViewingNotice, { by: i.viewingBy, onTakeOver: i.requestTakeOver }),
      o && c !== o && /* @__PURE__ */ e.jsx("p", { className: "cms:rounded-lg cms:border cms:bg-muted/40 cms:p-3 cms:text-sm cms:text-muted-foreground", role: "note", children: v === null ? t("Not saved in :language yet: these are the :main values, which the site shows meanwhile. Translate them, then save.", { language: d(c), main: d(o) }) : t("A field left empty shows the :main value on the site.", { main: d(o) }) }),
      /* @__PURE__ */ e.jsx($, { message: f.version, processing: s.processing, onSaveMine: w }),
      /* @__PURE__ */ e.jsx(l.KeptEditsNotice, { kept: i.kept, disabled: !m, onLoad: (a) => {
        D(a);
      }, onDiscard: (a) => {
        i.discardKept(a);
      } }),
      /* @__PURE__ */ e.jsx(
        V,
        {
          disabled: !m,
          fields: x,
          values: s.data.data,
          errors: f,
          storageKey: `cms:global:${r.handle}`,
          shared: N,
          sharedValues: b,
          sharedNote: o ? t("Shared by all languages: the greyed-out fields are edited in :language.", { language: d(o) }) : t("Shared by all languages: the greyed-out fields are edited in the main language."),
          onChange: (a, n) => {
            s.setData("data", { ...s.data.data, [a]: n }), k(`data.${a}`);
          }
        }
      )
    ] })
  ] });
}
export {
  H as default
};
