Extend the car listing system.

Create dynamic car details page.

Tasks:

1. Create dynamic route:

app/cars/[id]/page.tsx

2. When user clicks "View Details" on CarCard,
   navigate to:

/cars/{id}

3. Fetch car details from cars.json using id.

4. Display the following:

Car image gallery
Car name
Seats
Fuel type
Price per day
Description

5. Add a "Book Now" button.

6. Use shadcn components:

- Card
- Button
- Separator

7. Create responsive layout:
   Left side: car images
   Right side: car information

Do not implement booking yet.
