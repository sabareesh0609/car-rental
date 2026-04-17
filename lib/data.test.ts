import { describe, expect, it } from "vitest";
import {
  filterCars,
  getAllCars,
  getCarById,
  getDistinctFuels,
  getDistinctSeatCounts,
} from "./data";

describe("getAllCars", () => {
  it("returns a copy so callers cannot mutate the backing list", () => {
    const a = getAllCars();
    const b = getAllCars();
    expect(a).not.toBe(b);
    expect(a.length).toBeGreaterThan(0);
  });
});

describe("getCarById", () => {
  it("returns a car for numeric string ids", () => {
    const car = getCarById("1");
    expect(car).toBeDefined();
    expect(car?.id).toBe(1);
  });

  it("returns undefined for invalid id strings", () => {
    expect(getCarById("abc")).toBeUndefined();
    expect(getCarById("")).toBeUndefined();
  });

  it("returns undefined when id does not exist", () => {
    expect(getCarById(99999)).toBeUndefined();
  });
});

describe("getDistinctFuels / getDistinctSeatCounts", () => {
  const cars = getAllCars();

  it("returns sorted unique fuels", () => {
    const fuels = getDistinctFuels(cars);
    expect(fuels).toEqual([...new Set(fuels)].sort());
    expect(fuels.length).toBeGreaterThan(0);
  });

  it("returns sorted unique seat counts", () => {
    const seats = getDistinctSeatCounts(cars);
    expect(seats).toEqual([...new Set(seats)].sort((a, b) => a - b));
  });
});

describe("filterCars", () => {
  const cars = getAllCars();

  it("filters by case-insensitive name substring", () => {
    const out = filterCars(cars, {
      query: "swift",
      fuel: "all",
      seats: "all",
      maxPrice: "all",
    });
    expect(out.every((c) => c.name.toLowerCase().includes("swift"))).toBe(
      true
    );
    expect(out.length).toBeGreaterThan(0);
  });

  it("filters by fuel", () => {
    const out = filterCars(cars, {
      query: "",
      fuel: "Electric",
      seats: "all",
      maxPrice: "all",
    });
    expect(out.every((c) => c.fuel === "Electric")).toBe(true);
  });

  it("filters by seats", () => {
    const out = filterCars(cars, {
      query: "",
      fuel: "all",
      seats: "7",
      maxPrice: "all",
    });
    expect(out.every((c) => c.seats === 7)).toBe(true);
  });

  it("filters by max price cap", () => {
    const out = filterCars(cars, {
      query: "",
      fuel: "all",
      seats: "all",
      maxPrice: "2000",
    });
    expect(out.every((c) => c.price <= 2000)).toBe(true);
  });

  it("returns empty when nothing matches", () => {
    const out = filterCars(cars, {
      query: "zzznomatchzzz",
      fuel: "all",
      seats: "all",
      maxPrice: "all",
    });
    expect(out).toEqual([]);
  });
});
