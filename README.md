# DriveEase Car Rental (POC)

DriveEase is a mock car-rental web app built with Next.js App Router. It is a
POC focused on product flows (catalog, auth, bookings, admin) using JSON files
as the data source instead of a production database.

## Scope of this POC

- Browse cars and view car details
- Filter catalog by name, fuel, seats, and max price
- Mock login for user/admin roles using signed HTTP-only session cookie
- Create bookings and view my bookings
- Admin panel for dashboard stats, cars CRUD, and booking status updates

Data persistence is file-based (`data/*.json`) and intended only for local/demo
usage.

## Prerequisites

- Node.js 18+ (Node.js 20 recommended)
- npm

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Mock credentials

- User: `user@gmail.com` / `123456`
- Admin: `admin@gmail.com` / `admin123`

## Useful scripts

```bash
npm run lint
npm run test
npm run build
npm run test:e2e
```
