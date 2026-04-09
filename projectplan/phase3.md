# Phase 3 — Authentication (mock JSON)

Mock login with role-based redirects and protected routes. Prefer **cookies + React Context** over `localStorage` so auth works with Next.js App Router and middleware.

## Data

Create `data/users.json`:

```json
[
  { "id": 1, "email": "user@gmail.com", "password": "123456", "role": "user", "name": "Demo User" },
  { "id": 2, "email": "admin@gmail.com", "password": "admin123", "role": "admin", "name": "Admin" }
]
```

(Adjust fields as needed; do not use markdown mailto links inside JSON.)

## Auth layer

- `lib/auth.ts` — server-safe helpers: validate credentials against `users.json`, set/clear session cookie, read current user from cookie
- `components/providers/auth-provider.tsx` (or `context/auth-context.tsx`) — client context mirroring session for UI (navbar)
- `middleware.ts` — protect routes:
  - Require login for: booking flow, `/my-bookings`, `/admin/*`
  - `/admin/*` — only `role === "admin"`
  - Redirect unauthenticated users to `/login` with optional `callbackUrl`

## Login page

`app/login/page.tsx`:

- Email, password (`Input`, `Label`, `Button`)
- Server Action or route handler: verify user, set HTTP-only (or signed) cookie with user id + role (POC — not production-grade security)
- On success: redirect `user` → `/`, `admin` → `/admin/dashboard`
- On failure: show error (toast or inline)

## Navbar

- Logged in: show name, Logout, link to My Bookings (Phase 4), hide duplicate admin login route if using single `/login`

## Notes

- Single `/login` for both user and admin (original plan mentioned `app/admin/login`; consolidated to one login for simplicity unless you split later).
