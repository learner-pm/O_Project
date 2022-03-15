import { propsChange, addProps } from "./helper/entry";
import Compile, { getVarArr, addComponents } from "./compile";
import Observer from "./observer";

class Vaios {
  constructor(props) {
    if (new.target === undefined) throw new Error("use new keyword");
    if (!propsChange(props)) return false;
    this.props = props;
    this.init(props);
  }
  init(props) {
    const { el, data, methods } = props;
    this.el = el;
    this.data = data;
    //addProps(props, this); //把属性添加到对象上
    const compile = new Compile(this.el, this.data, methods); //先编译
    this.proxy = new Observer(this, compile.getArr()).getProxy(); //监听
    compile.addComponent(this.proxy);
    console.log(this.props);
  }
  mount() {
    addProps(this.props, this.proxy);
    return this.proxy;
  }
}

export default Vaios;

// dom的方法绑定，和属性添加的绑定
