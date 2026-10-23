function u(n, e) {
  const l = n[e]?.depth ?? 0;
  let o = e + 1;
  for (; o < n.length && n[o].depth > l; ) o++;
  return o;
}
function f(n, e) {
  const l = e < 0 ? 0 : e + 1, o = e < 0 ? n.length : u(n, e), r = e < 0 ? 0 : (n[e]?.depth ?? 0) + 1, d = [];
  for (let s = l; s < o; s++)
    n[s].depth === r && d.push(s);
  return d;
}
function i(n, e, l) {
  const o = f(n, e);
  if (l.length !== o.length || [...l].sort((t, c) => t - c).some((t, c) => t !== o[c]) || o.length === 0) return n.slice();
  const r = o[0], d = u(n, o[o.length - 1]), s = l.flatMap((t) => n.slice(t, u(n, t)));
  return [...n.slice(0, r), ...s, ...n.slice(d)];
}
function a(n, e) {
  const l = new Set(n.map((t) => t.id)), o = /* @__PURE__ */ new Map();
  for (const t of n) {
    const c = e(t), h = c != null && l.has(c) ? c : null;
    o.set(h, [...o.get(h) ?? [], t]);
  }
  const r = [], d = /* @__PURE__ */ new Set(), s = (t, c) => {
    for (const h of o.get(t) ?? [])
      d.has(h.id) || (d.add(h.id), r.push({ ...h, depth: c }), s(h.id, c + 1));
  };
  s(null, 0);
  for (const t of n)
    d.has(t.id) || (d.add(t.id), r.push({ ...t, depth: 0 }), s(t.id, 1));
  return r;
}
export {
  f as c,
  i as r,
  a as t
};
