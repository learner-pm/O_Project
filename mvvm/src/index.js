import Vaios from "./vaios";

const vaios = new Vaios({
  el: "app",
  data: {
    mes: "hello",
    zero: 0,
    three: "dsdsadsadsadsadas3",
  },
  methods: {
    //方法的绑定
    getZero() {
      this.zero++;
      this.mes += this.zero;
      console.log(this.zero);
    },
  },
}).mount();
// setInterval(() => {
//   vaios.zero > 50 ? (vaios.zero = 0) : vaios.zero++;
// }, 1000);

const proxy = new Proxy(
  {
    a: 0,
  },
  {}
);
proxy["1"] = 1;
console.log(proxy);

console.log(vaios);
