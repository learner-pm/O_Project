//在遍历生成domArrlist 之前编译，
//统一进行编译->生成dom->渲染

const creatComponent = function (slef, props, root) {
  const { name, template, ...res } = props;
  const dom = document.getElementsByTagName(name)[0];
  const newDom = document.createElement("DIV"); //生成父级
  newDom.innerHTML = template; //替换模板
  dom.parentNode.replaceChild(newDom, dom); //编译模板
  const child = new slef(res, name);
  root.childs.push({
    type: "component",
    dom: newDom,
    vm: child,
  });
  //root.childList.push({
  //维护子组件嵌套
  //  child,
  //});
  //console.log(root);
  return child;
  // console.log(res);
  // console.log(name);
  // console.log(slef);
  // 常生组件的方法
  //使用模板语法 在创建的时候进行生成dom节点，在添加到对应的组件位置。
  // console.log(target.e);
  // const component = document.getElementById(target.e);
  // component.setAttribute("isComponent", true);
  // root.tree.push({
  //   type: "child",
  //   dom: target.e,
  //   isRootComponent: true,
  // });
  // console.log(root.tree);
};
export default creatComponent;
