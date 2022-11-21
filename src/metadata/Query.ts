export default function Query() {
  return (target: any) => {
    const [, ...restMethods] = Object.getOwnPropertyNames(target.prototype);
    const executeCallbacks = (restMethods || []).map((item) => {
      return target.prototype[item];
    });
    Reflect.defineMetadata("design:type", executeCallbacks, target);
  };
}
