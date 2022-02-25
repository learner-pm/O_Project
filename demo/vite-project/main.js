import "./style.css";
import Vaios from "./src/index";

document.querySelector("#app").innerHTML = `
  <h1 click="appGetA">Hello</h1>
  {a}
`;
const methods = {
  appGetA() {
    //this.proxy.b = 10;
    setTimeout(() => {
      this.proxy.a = 100;
      //console.log(this.a);
    }, 1000);
    //console.log(this.a);
    //this.dep;
  },
};
const vs = new Vaios(
  {
    data: {
      a: 0,
    },
    methods,
  },
  "app"
);
console.log(vs);
console.log(1);
