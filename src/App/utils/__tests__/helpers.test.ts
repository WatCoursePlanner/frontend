import { capitalize, insertAt, removeAt } from "../helpers";

describe("helpers", () => {
  it("insertAt", () => {
    expect(insertAt([1, 2, 4], 2, 3)).toEqual([1, 2, 3, 4]);
    expect(insertAt([], 0, 3)).toEqual([3]);
    expect(insertAt([5, 6, 7], -1, 8)).toEqual([5, 6, 7, 8]);
    expect(insertAt([5, 6, 7], -1, 6, false)).toEqual([5, 6, 7]);
  });
  it("removeAt", () => {
    expect(removeAt([1, 2, 4], 2)).toEqual([1, 2]);
    expect(removeAt([1, 2, 4], 1)).toEqual([1, 4]);
    expect(removeAt([1, 2, 4], -1)).toEqual([1, 2, 4]);
    expect(removeAt([], 1)).toEqual([]);
    expect(removeAt([], -1)).toEqual([]);
    expect(removeAt([1], 0)).toEqual([]);
  });
  it("capitalize", () => {
    expect(capitalize("test")).toEqual("Test");
    expect(capitalize("test aaa")).toEqual("Test aaa");
    expect(capitalize("tEsT aaaHJgGhjjkjk")).toEqual("Test aaahjgghjjkjk");
    expect(capitalize("")).toEqual("");
    expect(capitalize("TEST")).toEqual("Test");
    expect(capitalize("tEST")).toEqual("Test");
  });
});
