import { addProps } from "../helper/entry";

class Pub {
  constructor(comData, proxy) {
    this.init(comData);
    this.data = proxy;
  }
  init(obj) {
    const { arr } = obj;
    this.arr = arr;
    console.log(this.arr);
  }
  nostiy(key, value) {
    const data = this.data;
    // const data = {
    //   [key]: value,
    // };
    this.arr.forEach((e) => {
      e._dom.textContent = eval(e._text);
    });
  }
}

class Observer {
  constructor(self, arr) {
    this.self = self;
    this.data = self.data;
    this.comp = arr;
    this.init();
  }
  init() {
    this.addProxy();
  }
  getProxy() {
    return this.proxy;
  }
  addProxy() {
    const observer = this;
    const proxy = new Proxy(this.data, {
      get(target, key, receiver) {
        return target[key];
      },
      set(target, key, value, receiver) {
        target[key] = value;
        observer.pud.nostiy(key, value);
        // component updated
        console.log(`value ${key} is ${value} now`);
        return true;
      },
    });
    this.proxy = proxy;
    // addProps(
    //   {
    //     proxy,
    //   },
    //   this.self
    // );
    this.pud = new Pub(this.comp, proxy);
  }
}

export default Observer;
