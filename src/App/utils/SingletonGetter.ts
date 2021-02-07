export function singletonGetter<T>(InstanceConstructor: { new(): T }) {
  let instance: T;

  return (): T => {
    if (instance === undefined) {
      instance = new InstanceConstructor();
    }

    return instance;
  };
}
