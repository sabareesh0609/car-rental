import fs from "node:fs";
import path from "node:path";
import type { Car } from "@/lib/data";

const CARS_FILE = path.join(process.cwd(), "data", "cars.json");

function writeCars(cars: Car[]) {
  fs.writeFileSync(CARS_FILE, `${JSON.stringify(cars, null, 2)}\n`, "utf-8");
}

export function readCars(): Car[] {
  const raw = fs.readFileSync(CARS_FILE, "utf-8");
  const data = JSON.parse(raw) as unknown;
  if (!Array.isArray(data)) {
    return [];
  }
  return data as Car[];
}

export function getCarForAdmin(id: number): Car | undefined {
  return readCars().find((car) => car.id === id);
}

export function createCar(input: Omit<Car, "id">): Car {
  const cars = readCars();
  const nextId = cars.length ? Math.max(...cars.map((car) => car.id)) + 1 : 1;
  const created: Car = { id: nextId, ...input };
  cars.push(created);
  writeCars(cars);
  return created;
}

export function updateCar(id: number, input: Omit<Car, "id">): Car | null {
  const cars = readCars();
  const index = cars.findIndex((car) => car.id === id);
  if (index === -1) {
    return null;
  }

  const updated: Car = { id, ...input };
  cars[index] = updated;
  writeCars(cars);
  return updated;
}

export function deleteCar(id: number): boolean {
  const cars = readCars();
  const next = cars.filter((car) => car.id !== id);

  if (next.length === cars.length) {
    return false;
  }

  writeCars(next);
  return true;
}

export function getCarStats() {
  const cars = readCars();
  const availableCars = cars.filter((car) => car.available).length;

  return {
    totalCars: cars.length,
    availableCars,
    unavailableCars: cars.length - availableCars,
  };
}
