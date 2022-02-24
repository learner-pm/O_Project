// window.addEventListener("popstate", (e) => {
//   console.log(window.location);
//   console.log(e);
// });

/*
    option
        mode :fnc
        routes :[]
*/
class Router {
  constructor(option = {}) {
    if (!this instanceof Router) {
      throw new Error("this router need use 'new' keyword");
    }
    this.option = option;
    this.init();
  }
  init() {
    const { mode } = this.option;
    if (mode === "hash") {
      this.hashHistory();
    } else {
      this.h5History();
    }
    this.h5History();
  }
  h5History() {
    const h5 = () => {
      console.log("url is changeing");
    };
    window.addEventListener("popstate", h5);
  }
  push(url) {
    console.log(url);
    this.hash(url);
  }
  back() {
    window.location.hash;
  }
  hashHistory() {
    const { routes } = this.option;
    const { path } = routes[0];
    let par = document.getElementById("conton");
    let nowHash = null;
    this.hash("#/");
    console.log(this.hash());
    const hashCallback = (e) => {
      nowHash = this.hash();
      console.log("这是当前hash值" + nowHash);
      routes.forEach((element) => {
        if ("#" + element.path === nowHash) {
          const child = document.createElement("p");
          child.innerHTML = document.getElementById(
            element.path.replace("/", "")
          ).innerHTML;
          par.innerHTML = null;
          par.appendChild(child);
          console.log(`需要渲染的组件${element.components}`);
        } else if ("/" === nowHash) {
          console.log("this");
        }
      });
    };
    //hashCallback();
    window.addEventListener("hashchange", hashCallback);
  }
  hash(url) {
    if (!url) return window.location.hash;
    window.location.hash = url;
  }
}
