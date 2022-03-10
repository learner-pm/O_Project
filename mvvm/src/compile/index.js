import { forEach, isVar, root } from "../util/index";

const componentData = {};
const cmopileTe = (id, data, component) => {
  const rootDom = root(id);
  Object.assign(componentData, data);

  lookAllDom(rootDom, component);
};

const lookAllDom = (dom, component) => {
  forEach(Array.from(dom.childNodes), (nodes) => {
    switch (nodes.nodeType) {
      case 1:
        lookAllDom(nodes, component);
        break;
      case 3:
        isText(nodes, component);
        break;
      case 8:
        break;
      default:
        lookAllDom(nodes, component);
    }
  });
};

const getVarArr = []; //收集依赖
const isText = (text, component) => {
  const _dom = text;
  const _text = text.nodeValue;
  if (!isVar.test(_text)) return;
  getVarArr.push({
    _dom,
    _text,
  });
  //console.log(isVar.test(text.nodeValue));
  Object.keys(componentData).forEach((e) => {
    if (text.nodeValue.includes(e)) text.textContent = componentData[e];
  });
  component["varArr"] = getVarArr;
};
export { getVarArr };
export default cmopileTe;
