import { root, forEach } from "../util/index.js";
import transText from "./text.js";
import transAttr from "./attr.js";
import { domObj } from "../virtualDom/index.js";
// import domMap from "../observer/map.js";
// -> complioce -》 virtalDom

class Compile {
  constructor(vaios) {
    this.self = vaios; //获取vaios对象，
    this.map = new Map();
    this.init(vaios);
  }
  init(vaios) {
    this.root = root(vaios.e);
    vaios.root = this.root;
    this.virtualDom = vaios.virtualDom;
    this.virtualDom.domTree = new domObj();
    this.virtualDom.domTree.type = this.root.nodeName;
    this.virtualDom.domTree.text = this.root.nodeValue;
    this.virtualDom.domTree.isRoot = true;
    this.cur(this.root, this.virtualDom.domTree);
    console.log(this.virtualDom.domTree);
    //console.log(this.root); //子节点出现isComponent -> true
  }
  cur(dom, pDomObj) {
    forEach(Array.from(dom.childNodes), (element) => {
      switch (element.nodeType) {
        case 1 && element.childNodes.length !== 0: //dom
          const obj = new domObj();
          obj.type = element.nodeName;
          obj.text = element.textContent;
          pDomObj.childrens.push(obj);
          transAttr(element, this.self);
          break;
        case 3: //text
          const obj2 = new domObj();
          obj2.type = element.nodeName;
          obj2.text = element.textContent;
          pDomObj.childrens.push(obj2);
          transText(element, this.self, this.map);
          break;
        case 8:
          console.log(`注释 ${element}`);
          break;
        default:
          const obj1 = new domObj();
          obj1.type = element.nodeName;
          obj1.text = element.nodeValue;
          pDomObj.childrens.push(obj1);
          transAttr(element, this.self);
          this.cur(element, obj1);
      }
    });
  }
}
export default Compile;
