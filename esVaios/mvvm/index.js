import Vaios from "./core/index.js";

const demo = function* () {
  yield "0";
  yield "1";
  yield "2";
  return "ending";
};
const list = demo();
console.log(list.next());


export default Vaios;
// const timeTrans = (time) => {
//   //转换成从1970年1月1日到time的毫秒数。
//   const date = time.split(" ");
//   return new Date(...date[0].split("/"), ...date[1].split(":")).getTime();
// };

// const compareTime = (selcetTime, tableTime, flag = 0) => {
//   // 0->end 1->creat  判断是否被包含，
//   return flag
//     ? timeTrans(selcetTime) <= timeTrans(tableTime)
//       ? true
//       : false
//     : timeTrans(selcetTime) >= timeTrans(tableTime)
//     ? true
//     : false;
// };

// const filterByTime = (timeValue) => {
//   //选出再选择时间段内符合的子集对象
//   if (!timeValue) return TableData;
//   else {
//     const [creatTime, endTime] = timeValue;
//     return TableData.filter(
//       (e) =>
//         compareTime(creatTime, e.creationTime, 1) &&
//         compareTime(endTime, e.endTime, 0)
//     );
//   }
// };

// const filterByType = (type = "name", value = "") => {
//   //以关键字过滤
//   if (!value) {
//     return TableData;
//   } else if (type === "name") {
//     return TableData.filter((e) => e.name.includes(value));
//   } else if (type === "tsakStatus") {
//     return TableData.filter((e) => e.tsakStatus[0].content === value);
//   }
// };
