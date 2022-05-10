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
            console.log(this);
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

const creatArc = (view, direction) => {
    const center = (360 - direction) * (Math.PI / 180);
    const startPoint =
        center - (view / 2) * (Math.PI / 180) < 0
            ? 2 * Math.PI + (center - (view / 2) * (Math.PI / 180))
            : center - (view / 2) * (Math.PI / 180);
    const endPoint =
        center + (view / 2) * (Math.PI / 180) > 2 * Math.PI
            ? center + (view / 2) * (Math.PI / 180) - 2 * Math.PI
            : center + (view / 2) * (Math.PI / 180);
    console.log(startPoint * (180 / Math.PI));
    console.log(endPoint * (180 / Math.PI));

    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#1abbcd1f";
    ctx.fillRect(0, 0, 200, 200);

    ctx.beginPath();
    ctx.arc(100, 100, 80, 0, 2 * Math.PI);
    ctx.fillStyle = "#1abbcd1f";
    ctx.fill();
    ctx.strokeStyle = "#1abbcd1f";
    ctx.stroke();
    ctx.save();
    if (view !== 0) {
        ctx.beginPath();
        ctx.moveTo(100, 100);
        ctx.arc(
            100,
            100,
            60,
            view === 360 || view == 0 ? 0 : startPoint - 0.5 * Math.PI,

            view === 360 || view == 0 ? 2 * Math.PI : endPoint - 0.5 * Math.PI,
            view === 360 ? true : false
        );
        ctx.fillStyle = "#1ABBCD";
        ctx.fill();
        ctx.strokeStyle = "#1ABBCD";
        ctx.stroke();
    }
};

creatArc(90, 180);
// ctx.beginPath();
// ctx.moveTo(100, 100);
// ctx.lineTo(95, 10);
// ctx.stroke();
