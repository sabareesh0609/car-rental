# Phase 5 — Admin panel

## Routes

- `app/admin/layout.tsx` — sidebar: Dashboard, Cars, Bookings
- `app/admin/dashboard/page.tsx` — stats: total cars, total bookings, available cars (or similar)
- `app/admin/cars/page.tsx` — CRUD UI for cars (persist to `cars.json`)
- `app/admin/bookings/page.tsx` — read-only or status edit for all bookings

## Cars management

- List cars in shadcn `Table` with Edit / Delete
- Add car: dialog or page with form
- Edit: pre-filled form
- Delete: `AlertDialog` confirmation
- All mutations via Server Actions writing `cars.json`

## Bookings management

- Table of all bookings with user + car info (resolve ids from `users.json` / `cars.json` as needed for display)

## Access control

- Middleware (or layout check): only `role === "admin"` for `/admin/*`

## UI

- `Table`, `Dialog`, `Form`, `Input`, `Select`, `Button`, `AlertDialog`
