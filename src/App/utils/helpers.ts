import { cloneDeep } from "lodash";

export function insertAt<T>(
  arr: Array<T>,
  index: number,
  element: T,
): Array<T> {
  const ret = cloneDeep(arr);
  if (index < 0) {
    ret.push(element);
  } else {
    ret.splice(index, 0, element);
  }
  return ret;
}

export function removeAt<T>(
  arr: Array<T>,
  index: number,
): Array<T> {
  if (index < 0) {
    return arr;
  }
  const ret = cloneDeep(arr);
  ret.splice(index, 1);
  return ret;
}

export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}
