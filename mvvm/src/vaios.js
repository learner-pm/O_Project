import { propsChange, addProps } from "./helper/entry";

class Vaios {
  constructor(props) {
    if (new.target === undefined) throw new Error("use new keyword");
    if (!propsChange(props)) return false;
    this.init(props);
  }
  init(props) {
    addProps(props, this);
  }
}

export default Vaios;
