function f(n, o) {
  const c = n[o]?.depth ?? 0;
  let t = o + 1;
  for (; t < n.length && n[t].depth > c; ) t++;
  return t;
}
function h(n, o) {
  const c = o < 0 ? 0 : o + 1, t = o < 0 ? n.length : f(n, o), u = o < 0 ? 0 : (n[o]?.depth ?? 0) + 1, l = [];
  for (let r = c; r < t; r++)
    n[r].depth === u && l.push(r);
  return l;
}
function g(n, o, c) {
  const t = h(n, o);
  if (c.length !== t.length || [...c].sort((e, s) => e - s).some((e, s) => e !== t[s]) || t.length === 0) return n.slice();
  const u = t[0], l = f(n, t[t.length - 1]), r = c.flatMap((e) => n.slice(e, f(n, e)));
  return [...n.slice(0, u), ...r, ...n.slice(l)];
}
function b(n, o) {
  const c = new Set(n.map((e) => e.id)), t = /* @__PURE__ */ new Map();
  for (const e of n) {
    const s = o(e), i = s != null && c.has(s) ? s : null, d = t.get(i);
    d ? d.push(e) : t.set(i, [e]);
  }
  const u = [], l = /* @__PURE__ */ new Set(), r = (e, s) => {
    for (const i of t.get(e) ?? [])
      l.has(i.id) || (l.add(i.id), u.push({ ...i, depth: s }), r(i.id, s + 1));
  };
  r(null, 0);
  for (const e of n)
    l.has(e.id) || (l.add(e.id), u.push({ ...e, depth: 0 }), r(e.id, 1));
  return u;
}
function a(n, o) {
  const c = n[o]?.depth ?? 0;
  for (let t = o - 1; t >= 0; t--)
    if (n[t].depth < c) return t;
  return -1;
}
function p(n, o) {
  const c = a(n, o), t = h(n, c);
  return { parent: c, position: t.indexOf(o) + 1, count: t.length };
}
function v(n, o, c) {
  const { parent: t } = p(n, o), u = h(n, t), l = u.indexOf(o);
  if (l < 0 || !Number.isFinite(c)) return null;
  const r = Math.min(Math.max(Math.trunc(c), 1), u.length) - 1;
  if (r === l) return null;
  const e = u.filter((s) => s !== o);
  return e.splice(r, 0, o), { parent: t, order: e };
}
export {
  h as c,
  v as m,
  g as r,
  b as t
};
