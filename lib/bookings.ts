import fs from "node:fs";
import path from "node:path";

import { getCarById } from "@/lib/data";
import { readCars } from "@/lib/cars-store";
import usersJson from "@/data/users.json";

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
export const BOOKING_STATUSES = [
  "confirmed",
  "pending",
  "completed",
  "cancelled",
] as const;

const BOOKINGS_FILE = path.join(process.cwd(), "data", "bookings.json");
const users = usersJson as Array<{
  id: number;
  email: string;
  name: string;
}>;

function writeBookings(bookings: Booking[]) {
  fs.writeFileSync(
    BOOKINGS_FILE,
    `${JSON.stringify(bookings, null, 2)}\n`,
    "utf-8"
  );
}

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
  writeBookings(bookings);
  return created;
}

export type AdminBookingRow = Booking & {
  userEmail: string;
  userName: string;
  carName: string;
};

export function getAllBookingsDetailed(): AdminBookingRow[] {
  const cars = readCars();

  return readBookings()
    .map((booking) => {
      const user = users.find((entry) => entry.id === booking.userId);
      const car = cars.find((entry) => entry.id === booking.carId);

      return {
        ...booking,
        userEmail: user?.email ?? `user-${booking.userId}@unknown`,
        userName: user?.name ?? `User #${booking.userId}`,
        carName: car?.name ?? `Car #${booking.carId}`,
      };
    })
    .sort((a, b) => b.id - a.id);
}

export function updateBookingStatus(
  id: number,
  status: (typeof BOOKING_STATUSES)[number]
): Booking | null {
  const bookings = readBookings();
  const index = bookings.findIndex((booking) => booking.id === id);

  if (index === -1) {
    return null;
  }

  const updated = {
    ...bookings[index],
    status,
  };

  bookings[index] = updated;
  writeBookings(bookings);
  return updated;
}
