export function removeChilds(el) {
  el.querySelectorAll('*').forEach((n) => n.remove())
}