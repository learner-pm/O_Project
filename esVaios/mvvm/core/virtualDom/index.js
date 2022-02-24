import { root, forEach } from "../util/index.js";

class domObj {
  type = undefined;
  text = undefined;
  className = undefined;
  id = undefined;
  att = [];
  isRoot = false;
  childrens = [];
  constructor() {}
}

class VirtualDom {
  constructor(root) {
    this.tree = {};
  }
  getTree() {
    return this.tree;
  }
  render(h) {
    console.log("开始渲染");
    const testRoot = root("test");
    const outDiv = document.createElement(this.domTree.type);
    testRoot.appendChild(outDiv);
    this.addDom(outDiv, this.domTree.childrens);
  }
  addDom(dom, arr) {
    forEach(arr, (e) => {
      if (e.childrens.length !== 0) {
        if (e.type === "#text") {
          const text = document.createTextNode(e.text);
          dom.appendChild(text);
        } else {
          const d = document.createElement(e.type);
          d.textContent = e.text;
          dom.appendChild(d);
          this.addDom(d, e.childrens);
        }
      } else {
        if (e.type === "#text") {
          const text = document.createTextNode(e.text);
          dom.appendChild(text);
        } else {
          const d = document.createElement(e.type);
          d.textContent = e.text;
          dom.appendChild(d);
        }
      }
    });
  }
}
export { domObj };
export default VirtualDom;
