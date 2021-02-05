import { cloneDeep } from "lodash";

export function insertAt<T>(arr: Array<T>, index: number, element: T): Array<T> {
  const ret = cloneDeep(arr);
  ret.splice(index, 0, element);
  return ret;
}

export function removeAt<T>(arr: Array<T>, index: number): Array<T> {
  const ret = cloneDeep(arr);
  ret.splice(index, 1);
  return ret;
}
