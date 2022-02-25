const pro = (obj = {}) => {
  const { data, textMap } = obj;
  //const data = this.vaios.proxy; //被观察的变量
  forEach(textMap, (text, dom) => {
    console.log(dom); //
    if (dom.nodeType === 1) console.log(dom.getAttribute("isComponent"));
    let nodeValue = text.text;

    //对text文件进行种类划分
    // function 分类
    forEach(text.text.match(regG), (value) => {
      let vle = value.replace(/\{/, "").replace(/\}/, "");
      if (/\?/g.test(vle)) {
        let a = data["a"];
        //let newVle = vle.replace('a',data['a'])
        console.log(eval(vle));
        nodeValue = nodeValue.replace(reg, eval(vle));
      }
      forEach(Object.entries(data), (e) => {
        //console.log(e[0] + vle);

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
};
export { pro };
