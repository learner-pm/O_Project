import Compile from "./compile/index.js";
import Observer from "./observer/index.js";
import creatComponent from "./component/index.js";
import Dom from "./virtualDom/index.js";
import { root, forEach } from "./util/index.js";
//实现 组件隔离
//实现 数据绑定
//实现 模板指令
//实现 观察数据
//构建tree实现观察

/*
oop {
  beforeComponent :渲染组件之前执行函数
  updateComponent :变量改变触发函数
  data :组件的数据
  methods :组件需要的方法
  effect :副作用方法

}
*/
class Vaios {
  constructor(oop = {}, e) {
    //处理参数正确性
    this.oop = oop;
    this.e = e; //保留根节点
    this.childs = []; //子组件
    this.tree = [
      //初始化组件树
      {
        type: "root",
        dom: this.e,
        isRootComponent: true,
      },
    ];
    this.init(oop);
  }
  init(oop) {
    const { beforeComponent, updateComponent } = oop;
    this.updateComponent = updateComponent;
    beforeComponent && beforeComponent();

    this.virtualDom = new Dom(this.tree); //记录根节点
    this.compile = new Compile(this); //编译模板并且生成虚拟dom对象以及记录依赖
    //console.log(this.compile.map);
    this.observer = new Observer(); //生成观察者，通过依赖布置函数进行监听，产生变化去通知虚拟dom
    this.observer.self(this);
    this.virtualDom.render(); //第一次渲染，手动通知

    //const rDOM = root("test");
    //const fir = document.createElement(this.virtualDom.domTree.type);
    //rDOM.appendChild(fir);
    //this.setDome(fir, this.virtualDom.domTree.childrens);
    //console.log(this.virtualDom.domTree);
    //console.log(this);
  }
  creatComponent(obj) {
    //返回一个vm对象
    return creatComponent(Vaios, obj, this); //构造类，参数，父级指针
  }
  setDome(dom, arr) {
    //生成真实dom
    //const obj = tree.dom;
  }
}
// globalThis.Vaios = Vaios;
// Window.Vaios = Vaios;
export default Vaios;
