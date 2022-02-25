import { forEach } from "../util/index.js";
const event = [
  //遍历方法名进行匹配添加
  "click",
  "dbclick",
  "mouseenter",
  "mouseleave",
  "mousemove",
  "mouseout",
  "Keydown",
];
const transAttr = (dom, slef) => {
  const { methods } = slef.oop;
  forEach(Object.values(dom.attributes), (value) => {
    if (value.name === "click") {
      forEach(Object.entries(methods), (method) => {
        if (method[0] === value.value.replace("(", "").replace(")", ""))
          dom.addEventListener("click", (e) => {
            method[1].call(slef, e);
          });
      });
    } else if (value.name) {
      //其他指令
    }
  });
  //console.log(dom);
};
export default transAttr;
