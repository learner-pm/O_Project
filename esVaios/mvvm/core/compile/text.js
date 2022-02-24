import { forEach, reg, regG } from "../util/index.js";
const _eval = (str, obj) => {
  //处理模板字符串
  return Function("data", '"use strict";return (' + str + ")")(obj);
};
const findStr = (str) => {
  //返回变量和字符串arr
  //a ->97 z ->122 A ->65 Z ->90
  const arr = {
    str: [],
    sym: [],
  };
  let result = "";
  for (let i = 0; i < str.length; i++) {
    // const reg = /\w/
    // if (reg) {
    //   if (str.charCodeAt(i - 1) === 39 && str.charCodeAt(i + 1) === 39) {
    //     arr.str.push(`'${str[i]}'`);
    //   } else {
    //     result += str[i];
    //     i === str.length - 1 && arr.sym.push({ i, result });
    //   }
    // } else {
    //   result.length !== 0 && arr.sym.push({ i: i - 1, result });
    //   result = "";
    // }
    const nowChar = str.charCodeAt(i);
    if ((nowChar >= 97 && nowChar <= 122) || (nowChar >= 65 && nowChar <= 90)) {
      if (str.charCodeAt(i - 1) === 39 && str.charCodeAt(i + 1) === 39) {
        arr.str.push(`'${str[i]}'`);
      } else {
        result += str[i];
        i === str.length - 1 && arr.sym.push({ i, result });
      }
    } else {
      result.length !== 0 && arr.sym.push({ i: i - 1, result });
      result = "";
    }
  }
  return arr;
};

const _replace = (str, index, e) => {
  //按照位置替换变量
  let i = 0;
  let j = 0;
  str = str.split("");
  while (j < e.length - 1) {
    i = 0;
    while (i < str.length - index - 1) {
      str[str.length - i] = str[str.length - i - 1];
      i++;
    }
    j++;
  }
  i = 0;
  while (i < e.length) {
    //合并
    str[index + i] = e[i];
    i++;
  }
  return str.join("");
};
const textType = (text, oldStr, data, slef, dom) => {
  //处理三元表达式
  const regA = /\'((?:.|\n)+?)\'/;
  const regAL = /\'((?:.|\n)+?)\'/g;
  text = text.replace("{", "").replace("}", "");
  //console.log(text);
  let evalVle = findStr(text);
  //console.log(evalVle);
  forEach(evalVle.sym, (e, index) => {
    const sum = 8 * index;
    text = _replace(text, e.i + sum, "${data." + e.result + "}");
  });
  return text;
};
const transText = (dom, slef, map) => {
  //转换text
  // dsajdsa{{sss}},{{asa}} -> dsajdsa${data.sss},${data.asa}
  const { data } = slef.oop;
  let oldStr = dom.nodeValue;
  let vle = undefined;
  if (!reg.test(oldStr)) {
    return;
  }
  forEach(oldStr.match(regG), (value) => {
    //vle = value.replace(/\{/, "").replace(/\}/, "").trim(); //如果插值里面是表达式该如何操作?
    //eval执行代码来进行求值计算，需要在其上下文提前给出变量
    //对于插值里面的表达式要进行统一计算 单个变量 表达式？
    if (/\?/.test(value) && /\:/.test(value)) {
      const transText = _eval("`" + textType(value) + "`", data);
      //console.log(`${transText}`);
      //console.log(_eval(transText));
      oldStr = oldStr.replace(value, "${" + transText + "}");
    } else {
      const sym = "${data." + value.replace(/\{/, "").replace(/\}/, "") + "}";
      oldStr = oldStr.replace(value, sym);
    }
  });
  oldStr = "`" + oldStr + "`";
  map.set(dom, {
    text: oldStr, //模板字符串 eval(str)，注意上下文
    dom: slef.e,
  });

  //console.log(oldStr);
  //console.log(_eval(oldStr, data));
  dom.textContent = _eval(oldStr, data);

  //console.log(slef);
};

export default transText;
