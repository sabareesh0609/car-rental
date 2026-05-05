import { describe, expect, it } from "vitest";
import {
  billableRentalDays,
  computeBookingTotal,
} from "@/lib/booking-math";

describe("billableRentalDays", () => {
  it("counts inclusive calendar days", () => {
    expect(billableRentalDays("2026-04-01", "2026-04-03")).toBe(3);
  });

  it("returns 1 for same-day rental", () => {
    expect(billableRentalDays("2026-04-01", "2026-04-01")).toBe(1);
  });

  it("returns null when return is before pickup", () => {
    expect(billableRentalDays("2026-04-03", "2026-04-01")).toBeNull();
  });

  it("returns null for invalid dates", () => {
    expect(billableRentalDays("nope", "2026-04-01")).toBeNull();
  });
});

describe("computeBookingTotal", () => {
  it("multiplies days by daily price", () => {
    expect(computeBookingTotal(2800, "2026-04-01", "2026-04-03")).toEqual({
      days: 3,
      totalPrice: 8400,
    });
  });
});
