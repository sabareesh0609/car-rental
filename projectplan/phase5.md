Extend the project with booking functionality and admin panel.

Create file:

data/bookings.json

Structure:

[
{
"id": 1,
"userId": 1,
"carId": 2,
"pickupDate": "2026-04-01",
"returnDate": "2026-04-03",
"totalPrice": 4000
}
]

User Features:

1. On car details page add booking form:

- pickup date
- return date

2. Calculate:
   total days
   total price

3. Save booking to bookings.json.

Admin Panel:

Create routes:

app/admin/login
app/admin/dashboard
app/admin/cars

Admin Features:

- view all cars
- add car
- edit car
- delete car

Admin edits should update cars.json.

UI:

Use shadcn Table for admin list.

Add basic admin dashboard stats:

- total cars
- total bookings.

Protect admin routes so only role=admin can access them.
