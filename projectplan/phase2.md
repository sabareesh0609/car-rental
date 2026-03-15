Extend the existing Next.js project.

Add mock JSON data for cars.

Create a folder:

data/cars.json

Example structure:

[
{
"id": 1,
"name": "Toyota Innova",
"seats": 7,
"fuel": "Diesel",
"price": 3500,
"available": true,
"images": ["/cars/innova1.jpg"],
"description": "Comfortable family SUV"
}
]

Tasks:

1. Create a utility function:

lib/readJson.ts

that reads JSON files.

2. Create a CarCard component:

components/car-card.tsx

Card must display:

- Car image
- Car name
- Seats
- Fuel
- Price per day
- "View Details" button

3. Update cars/page.tsx:

- Read cars.json
- Display all cars in a grid layout
- Use Tailwind grid

4. Make UI modern using shadcn Card component.

5. Use placeholder images if needed.

This phase should only display cars from JSON.
