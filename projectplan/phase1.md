# Phase 1 — Project setup and layout

Create a Next.js 14 project using the App Router.

## Tech stack

- Next.js 14
- TailwindCSS
- shadcn/ui
- TypeScript

Project folder: app root (`car-rental`).

## Requirements

1. Basic layout with Navbar, main content area, Footer.

2. Navbar:

   - Logo text "DriveEase"
   - Links: Home, Cars, Login (extend in later phases for logged-in state)
   - Mobile: hamburger menu using shadcn `Sheet`

3. TailwindCSS for styling; responsive design.

4. Install and configure shadcn/ui (Button, Sheet for mobile nav).

5. Folder structure:

```
app/
  layout.tsx
  page.tsx
  login/page.tsx
  cars/page.tsx
components/
  navbar.tsx
  footer.tsx
  mobile-nav.tsx
```

6. Home page:

   - Hero section
   - Title: "Find Your Perfect Rental Car"
   - Button: "Browse Cars" (links to `/cars`)

7. Do not implement backend or real auth yet — UI and layout only.
