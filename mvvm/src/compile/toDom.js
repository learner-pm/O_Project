import { forEach } from "../util";

const isDom = (dom, component, methods, getVarArr) => {
  const Z = new Proxy({}, {});
  //console.log(Z instanceof Proxy);
  if (dom.nodeName === "INPUT") {
    console.log(dom.value);
    const { data = {} } = component;

    //if(Object.entries(dom.attributes).includes('model'))
    const obj =
      Object.values(dom.attributes).find((e) => e.name === "modal") ||
      undefined;
    // obj !== undefined && dom.removeAttribute(obj.name);
    //console.log(obj);
    dom.value = component[obj.value];
    getVarArr.arr.push({
      _dom: dom, //对依赖中得dom类型进行判断，
    });
    dom.addEventListener("input", (e) => {
      component[obj.value] = e.target.value;
      //console.log(e.target.value);
    });
  }
  forEach(Object.values(dom.attributes), (values) => {
    if (values.name === "click") {
      forEach(Object.entries(methods), (method) => {
        if (method[0] === values.value.replace("(", "").replace(")", "")) {
          dom.addEventListener("click", (e) => {
            method[1].call(component, e);
          });
          dom.removeAttribute(values.name);
        }
      });
    }
  });
};

export { isDom };
