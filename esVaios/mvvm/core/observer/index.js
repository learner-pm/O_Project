import { forEach } from "../util/index.js";
import Dep from "./dep.js";

class Observer {
  constructor(params) {}
  self(vaios) {
    this.vaios = vaios;
    this.init();
  }
  init() {
    this.dep = new Dep();
    this.dep.self(this.vaios);
    const component = this.vaios;
    //在这里对变量进行观察 变量改变就发布
    const { data = {} } = this.vaios.oop;
    const self = this.dep;
    const proxy = new Proxy(data, {
      get(target, propkey, receiver) {
        //console.log(`var ${propkey} is ${target[propkey]}`);
        return target[propkey];
      },
      set(target, propkey, value, receiver) {
        target[propkey] = value;
        //通知
        self.nostiy();
        //数据更新进行调用
        console.log(component);
        component.updateComponent && component.updateComponent.call(component);
        //console.log(`you set ${propkey} is ${value} `);
        return true;
      },
    });
    this.vaios.proxy = proxy;
  }
}

export default Observer;
