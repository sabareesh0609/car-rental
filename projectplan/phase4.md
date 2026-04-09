# Phase 4 — Booking system (user)

## Data

Create `data/bookings.json`:

```json
[
  {
    "id": 1,
    "userId": 1,
    "carId": 2,
    "pickupDate": "2026-04-01",
    "returnDate": "2026-04-03",
    "totalPrice": 7000,
    "status": "confirmed"
  }
]
```

## Library

- `lib/bookings.ts` — list bookings by user, create booking (used by Server Actions)

Persist new bookings by appending to `bookings.json` (file writes on server — acceptable for POC).

## Car detail / booking

On `app/cars/[id]/page.tsx` (or a dedicated `app/cars/[id]/book/page.tsx`):

- If not logged in: prompt to login or redirect via middleware
- Form: pickup date, return date (shadcn `Calendar` / date picker or native `input type="date"` for simplicity)
- Compute rental days and `totalPrice = days * car.price`
- Submit via Server Action → append to `bookings.json`
- Success: toast + redirect to `/my-bookings`

## My bookings

`app/my-bookings/page.tsx`:

- Table or card list of current user’s bookings
- Columns: car name (join from cars), pickup, return, total, status
- Protected by middleware

## shadcn

- `Table`, `Badge`, toasts (`Sonner` or `Toast`)
