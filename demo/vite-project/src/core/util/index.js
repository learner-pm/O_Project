export function isObject(obj = {}) {
  return obj !== null && typeof obj === "Object";
}
export function isArray(arr = []) {
  return Array.isArray(arr);
}
export function forEach(arr, fun) {
  if (arr.length === 0) return;
  arr.forEach((value, index, arr) => {
    fun(value, index, arr);
  });
}

export function root(e = "") {
  return document.getElementById(e);
}
export function setText(dom, text) {
  dom.textContent = text;
}

export const reg = /\{((?:.|\n)+?)\}/;
export const regG = /\{((?:.|\n)+?)\}/g;
