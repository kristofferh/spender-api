import { randomValue } from "utils/color";

describe("color tests", () => {
  describe("randomValue", () => {
    it("should return the value on an single item", () => {
      expect(randomValue([1])).toEqual(1);
    });

    it("should return the value on an single item", () => {
      expect(randomValue([1, 3, 2, 4])).toBeDefined();
    });

    it("should be empty on an empty array", () => {
      expect(randomValue([])).toBeUndefined();
    });
  });
});
