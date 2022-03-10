import { propsChange, addProps } from "./helper/entry";
import cmopileTe from "./compile";

class Vaios {
  constructor(props) {
    if (new.target === undefined) throw new Error("use new keyword");
    if (!propsChange(props)) return false;
    this.init(props);
  }
  init(props) {
    const { el, data } = props;
    addProps(props, this); //把属性添加到对象上
    cmopileTe(el, data, this);
  }
}

export default Vaios;
