import { insertAt, removeAt } from "../helpers";

describe("helpers", () => {
  it("insertAt", () => {
    expect(insertAt([1, 2, 4], 2, 3)).toEqual([1, 2, 3, 4]);
    expect(insertAt([], 0, 3)).toEqual([3]);
  });
  it("removeAt", () => {
    expect(removeAt([1, 2, 4], 2)).toEqual([1, 2]);
    expect(removeAt([1, 2, 4], 1)).toEqual([1, 4]);
    expect(removeAt([], 1)).toEqual([]);
    expect(removeAt([1], 0)).toEqual([]);
  });
});
