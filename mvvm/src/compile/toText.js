import { isVar, varG } from "../util/index";

const isText = (text, getVarArr, component) => {
  if (!isVar.test(text.nodeValue)) return;
  let _text = text.nodeValue;
  const regArr = _text.match(varG); //一个str中得所以满足情况得插值表达式
  let str = "";
  for (let i = 0; i < regArr.length; i++) {
    const arr = _text.split(regArr[i]);
    str = `${str}${arr[0]}${
      "${data." + regArr[i].replace("{", "").replace("}", "") + "}"
    }`;
    _text = arr[1];
  }
  getVarArr.arr.push({
    _dom: text,
    _text: "`" + str + "`",
  });
  const data = getVarArr.data;
  text.textContent = eval("`" + str + "`");
};

export { isText };
