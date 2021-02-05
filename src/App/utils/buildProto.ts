import { DeepPartial } from "utility-types/dist/mapped-types";

export function buildProto<T>(partial: DeepPartial<T>): T {
  return partial as T;
}
