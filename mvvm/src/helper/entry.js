import { isObject, isString } from "../util/index";
const propsChange = (obj) => {
  const { el, data } = obj;
  if (!isString(el)) {
    console.error(new Error("type error ,it shouled a string"));
    return false;
  }
  if (!isObject(data)) {
    console.error(new Error("type error ,it shouled an object"));
    return false;
  }
  return true;
};

const addProps = (proto, obj) => {
  Object.keys(proto).forEach((e) => {
    // obj[e.toString()] = proto[e];
    obj[e] = proto[e];
    // console.log(proto[e]);
  });
};
export { propsChange, addProps };
