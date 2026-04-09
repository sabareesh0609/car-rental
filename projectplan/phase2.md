# Phase 2 — Car listing, filters, and detail page

Extend the Next.js project with mock car data, listing, search/filter, and car detail.

## Data

Create `data/cars.json` with 8–10 mock cars. Each item includes at least:

- `id`, `name`, `seats`, `fuel`, `price` (per day), `available`, `images` (paths or URLs), `description`

Use placeholder images where needed (e.g. `/placeholder-car.jpg` or public assets).

## Utilities

- `lib/data.ts` — read cars from JSON; helpers to get by id, filter by name/fuel/seats/price range (or implement filter logic in the page).

## Components

- `components/car-card.tsx` — image, name, seats, fuel, price/day, "View Details" → `/cars/[id]`
- Use shadcn `Card`, `Badge` where helpful

## Pages

1. **`app/cars/page.tsx`**

   - Load cars from `cars.json`
   - Responsive grid of `CarCard`
   - Search by car name (`Input`)
   - Filters: fuel type, seats, price range (`Select` or similar)
   - Empty state when no matches

2. **`app/cars/[id]/page.tsx`**

   - Resolve car by id; `notFound()` if missing
   - Layout: images left (or top on mobile), info right
   - Show name, seats, fuel, price/day, description
   - "Book Now" button — in Phase 2 can link to login or be disabled until Phase 4 implements booking

## shadcn

- `Card`, `Button`, `Separator`, `Input`, `Select`, `Badge`

This phase is read-only mock data (no writes to JSON).
