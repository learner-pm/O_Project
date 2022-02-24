import { forEach, reg, regG } from "../util/index.js";
class Dep {
  constructor() {}
  self(vaios) {
    this.vaios = vaios;
  }
  textType(text) {
    if (/\?/g.test(text)) {
      console.log(text);
    }
  }
  textType(text) {
    //if (/\?/g.test(text)) console.log(text);
  }
  nostiy() {
    const h = 10;
    const str = `if(h) {console.log(h)} else{return  console.log(0)}`;
    // if (h === 10) {
    //   console.log(h * h);
    // } else {
    //   console.log(0);
    // }
    //const re = eval(str);
    //console.log(re);
    //优化 嵌套数据改变问题
    //let isOwn = false;
    //console.log("我即将通知");
    const data = this.vaios.proxy; //被观察的变量
    const slef = this.vaios;
    const textType = this.textType;
    forEach(this.vaios.compile.map, (text, dom) => {
      //console.log(dom);
      //if (dom.nodeType === 1) console.log(dom.getAttribute("isComponent"));
      let nodeValue = text.text;
      forEach(text.text.match(regG), (value) => {
        let vle = value.replace(/\{/, "").replace(/\}/, "");
        textType(vle);
        if (/\?/g.test(vle)) {
          let a = data["a"];
          //let newVle = vle.replace('a',data['a'])
          // console.log(eval(vle));
          nodeValue = nodeValue.replace(reg, eval(vle));
        }
        forEach(Object.entries(data), (e) => {
          //console.log(e[0] + vle);
          slef[e[0]] = e[1];
          if (vle === e[0]) {
            // isOwn = true; //存在变化的变量才改变
            nodeValue = nodeValue.replace(reg, e[1]);
          }
        });
      });
      // if (isOwn) {

      dom.textContent = nodeValue;
      //  isOwn = !isOwn;
      //}
    });
  }
}
export default Dep;
