import fs from "node:fs";
import path from "node:path";

import { getCarById } from "@/lib/data";

export type Booking = {
  id: number;
  userId: number;
  carId: number;
  pickupDate: string;
  returnDate: string;
  totalPrice: number;
  status: string;
};

export { computeBookingTotal, billableRentalDays } from "@/lib/booking-math";

const BOOKINGS_FILE = path.join(process.cwd(), "data", "bookings.json");

export function readBookings(): Booking[] {
  const raw = fs.readFileSync(BOOKINGS_FILE, "utf-8");
  const data = JSON.parse(raw) as unknown;
  if (!Array.isArray(data)) return [];
  return data as Booking[];
}

export function getBookingsForUser(userId: number): Booking[] {
  return readBookings()
    .filter((b) => b.userId === userId)
    .sort((a, b) => b.id - a.id);
}

export type BookingWithCar = Booking & { carName: string };

export function getBookingsWithCarForUser(userId: number): BookingWithCar[] {
  return getBookingsForUser(userId).map((b) => {
    const car = getCarById(b.carId);
    return {
      ...b,
      carName: car?.name ?? `Car #${b.carId}`,
    };
  });
}

export function appendBooking(row: Omit<Booking, "id">): Booking {
  const bookings = readBookings();
  const nextId = bookings.length
    ? Math.max(...bookings.map((b) => b.id)) + 1
    : 1;
  const created: Booking = { ...row, id: nextId };
  bookings.push(created);
  fs.writeFileSync(
    BOOKINGS_FILE,
    `${JSON.stringify(bookings, null, 2)}\n`,
    "utf-8"
  );
  return created;
}
