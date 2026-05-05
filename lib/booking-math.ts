function parseLocalDate(isoDate: string): Date | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(isoDate.trim());
  if (!m) return null;
  const y = Number(m[1]);
  const mo = Number(m[2]);
  const d = Number(m[3]);
  if (!y || mo < 1 || mo > 12 || d < 1 || d > 31) return null;
  const dt = new Date(y, mo - 1, d);
  if (
    dt.getFullYear() !== y ||
    dt.getMonth() !== mo - 1 ||
    dt.getDate() !== d
  ) {
    return null;
  }
  return dt;
}

/** Inclusive calendar days (pickup and return both count as rental days). */
export function billableRentalDays(
  pickupDate: string,
  returnDate: string
): number | null {
  const pickup = parseLocalDate(pickupDate);
  const ret = parseLocalDate(returnDate);
  if (!pickup || !ret) return null;
  const diffDays = Math.round(
    (ret.getTime() - pickup.getTime()) / (1000 * 60 * 60 * 24)
  );
  if (diffDays < 0) return null;
  return diffDays + 1;
}

export function computeBookingTotal(
  pricePerDay: number,
  pickupDate: string,
  returnDate: string
): { days: number; totalPrice: number } | null {
  const days = billableRentalDays(pickupDate, returnDate);
  if (days === null || days < 1) return null;
  return { days, totalPrice: days * pricePerDay };
}
