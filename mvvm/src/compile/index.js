import { forEach, root } from "../util/index";
import { isText } from "./toText";
import { isDom } from "./toDom";

const getVarArr = {
  data: {},
  arr: [],
}; //收集依赖
let _proxy;

class Compile {
  constructor(id, data, methods) {
    this.rootDom = root(id);
    this.methods = methods;
    Object.assign(getVarArr.data, data);
    this.lookAllDom(this.rootDom, {}, {});
  }
  lookAllDom(dom, component, methods) {
    forEach(Array.from(dom.childNodes), (nodes) => {
      switch (nodes.nodeType) {
        case 1: //dom
          isDom(nodes, component, methods, getVarArr);
          this.lookAllDom(nodes, component);
          break;
        case 3: //text
          isText(nodes, getVarArr);
          break;
        case 8: //注释
          break;
        default:
          this.lookAllDom(nodes, component, methods);
      }
    });
  }
  addComponent(proxy) {
    this.proxy = proxy;
    console.log(proxy);
    const { methods } = proxy;
    console.log(proxy["methods"]);
    this.lookAllDom(this.rootDom, proxy, this.methods);
  }
  getArr() {
    return getVarArr;
  }
}
const cmopileTe = (id, data, component, methods) => {
  //const { methods } = component;
  console.log(methods);
  const rootDom = root(id);
  Object.assign(getVarArr.data, data);
  lookAllDom(rootDom, methods, component);
  return getVarArr;
};

const lookAllDom = (dom, methods, component) => {
  forEach(Array.from(dom.childNodes), (nodes) => {
    switch (nodes.nodeType) {
      case 1: //dom
        isDom(nodes, methods, component);
        lookAllDom(nodes, component);
        break;
      case 3: //text
        isText(nodes, getVarArr, component);
        break;
      case 8: //注释
        break;
      default:
        lookAllDom(nodes, methods, component);
    }
  });
};

const addComponents = (proxy) => {
  _proxy = proxy;
};
export { getVarArr, addComponents };
export default Compile;
