import { forEach, root } from "../util/index";
import { isText } from "./toText";
import { isDom } from "./toDom";

const getVarArr = {
  data: {},
  arr: [],
}; //收集依赖

const cmopileTe = (id, data, component) => {
  const rootDom = root(id);
  Object.assign(getVarArr.data, data);
  lookAllDom(rootDom, component);
};

const lookAllDom = (dom, component) => {
  forEach(Array.from(dom.childNodes), (nodes) => {
    switch (nodes.nodeType) {
      case 1:
        isDom(nodes, getVarArr.data, component);
        lookAllDom(nodes, component);
        break;
      case 3: //递归终止条件
        isText(nodes, getVarArr, component);
        break;
      case 8: //递归终止条件
        break;
      default:
        lookAllDom(nodes, component);
    }
  });
};

export { getVarArr };
export default cmopileTe;
