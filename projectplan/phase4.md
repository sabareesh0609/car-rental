Add authentication using mock JSON data.

Create file:

data/users.json

Example data:

[
{
"id": 1,
"email": "[user@gmail.com](mailto:user@gmail.com)",
"password": "123456",
"role": "user"
},
{
"id": 2,
"email": "[admin@gmail.com](mailto:admin@gmail.com)",
"password": "admin123",
"role": "admin"
}
]

Tasks:

1. Create login page:

app/login/page.tsx

Fields:

- email
- password

2. On login submit:

- read users.json
- compare email + password

3. If login success:
   store user data in localStorage.

4. Redirect:
   user → homepage
   admin → /admin/dashboard

5. Create utility:

lib/auth.ts

Functions:
login()
logout()
getCurrentUser()

6. Protect pages:
   If user not logged in redirect to login.

Use shadcn Input and Button components.
