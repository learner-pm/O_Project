import { forEach } from "../util";

const isDom = (dom, component, methods) => {
  forEach(Object.values(dom.attributes), (values) => {
    if (values.name === "click") {
      forEach(Object.entries(methods), (method) => {
        if (method[0] === values.value.replace("(", "").replace(")", "")) {
          dom.addEventListener("click", (e) => {
            method[1].call(component, e);
          });
        }
      });
    }
  });
};

export { isDom };
