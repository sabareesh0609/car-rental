import carsJson from "@/data/cars.json";

export type Car = {
  id: number;
  name: string;
  seats: number;
  fuel: string;
  price: number;
  available: boolean;
  images: string[];
  description: string;
};

const cars = carsJson as Car[];

export function getAllCars(): Car[] {
  return [...cars];
}

export function getCarById(id: string | number): Car | undefined {
  const n = typeof id === "string" ? Number.parseInt(id, 10) : id;
  if (Number.isNaN(n)) return undefined;
  return cars.find((c) => c.id === n);
}

export function getDistinctFuels(carsList: Car[]): string[] {
  return Array.from(new Set(carsList.map((c) => c.fuel))).sort();
}

export function getDistinctSeatCounts(carsList: Car[]): number[] {
  return Array.from(new Set(carsList.map((c) => c.seats))).sort(
    (a, b) => a - b
  );
}

export type CarFilterState = {
  query: string;
  fuel: string;
  seats: string;
  maxPrice: string;
};

export function filterCars(list: Car[], f: CarFilterState): Car[] {
  const q = f.query.trim().toLowerCase();
  return list.filter((car) => {
    if (q && !car.name.toLowerCase().includes(q)) return false;
    if (f.fuel !== "all" && car.fuel !== f.fuel) return false;
    if (f.seats !== "all" && String(car.seats) !== f.seats) return false;
    if (f.maxPrice !== "all") {
      const max = Number(f.maxPrice);
      if (!Number.isNaN(max) && car.price > max) return false;
    }
    return true;
  });
}
