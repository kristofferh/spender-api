import { median, sum, avg, toDecimal } from "utils/math";

describe("math utility methods", () => {
  describe("toDecimal", () => {
    it("should return a decimal value", () => {
      expect(toDecimal(0.1200000000001)).toEqual(0.12);
    });

    it("should return a non-fractional value", () => {
      expect(toDecimal(700)).toEqual(700);
    });

    it("should return a rounded fractional value", () => {
      expect(toDecimal(0.16666666667)).toEqual(0.17);
    });
  });

  describe("median", () => {
    it("should return the median of an odd list of values", () => {
      expect(median([2, 3, 3])).toEqual(3);
    });

    it("should return the median of an even list of values", () => {
      expect(median([2, 3, 3, 5])).toEqual(3);
    });

    it("should return the median of an even list of values", () => {
      expect(median([2, 3, 3, 5])).toEqual(3);
    });

    it("should return the median of a list of fractional values", () => {
      expect(median([2, 16, 3, 3.5])).toEqual(3.25);
    });

    it("should return NaN for an empty array", () => {
      expect(median([])).toEqual(NaN);
    });
  });

  describe("avg", () => {
    it("should return the mean of a list of values", () => {
      expect(avg([2, 3, 4])).toEqual(3);
    });

    it("should return the mean of list of equal values", () => {
      expect(avg([1, 1, 1, 1])).toEqual(1);
    });

    it("should return the mean of a list of fractional values", () => {
      expect(avg([2, 16, 3, 3.5])).toEqual(6.125);
    });

    it("should return NaN for an empty array", () => {
      expect(avg([])).toEqual(NaN);
    });
  });

  describe("sum", () => {
    it("should return the sum of a list of values", () => {
      expect(sum([2, 3, 3])).toEqual(8);
    });

    it("should return the sum of an empty list values", () => {
      expect(sum([])).toEqual(0);
    });

    it("should return the sum of a list of fractional values, rounded to two decimals", () => {
      expect(toDecimal(sum([2.2, 1.6, 3.51]))).toEqual(7.31);
    });

    it("should return the sum of a list of non-fractional values, rounded to two decimals", () => {
      expect(toDecimal(sum([2, 1, 3]))).toEqual(6);
    });
  });
});
