import { expect, test, type Page } from "@playwright/test";

async function signInAsDemoUser(page: Page) {
  await page.goto("/login");
  await page.getByLabel("Email").fill("user@gmail.com");
  await page.getByLabel("Password").fill("123456");
  await page.getByRole("button", { name: "Sign in" }).click();
  await expect(page.getByRole("link", { name: "My Bookings" })).toBeVisible({
    timeout: 20_000,
  });
}

function addDays(base: Date, days: number): Date {
  const d = new Date(base);
  d.setDate(d.getDate() + days);
  return d;
}

function toInputDate(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

test.describe("Bookings (Phase 4)", () => {
  test.describe.configure({ mode: "serial" });
  test("my bookings lists seeded reservation for demo user", async ({
    page,
  }) => {
    await signInAsDemoUser(page);
    await page.goto("/my-bookings");

    await expect(
      page.getByRole("heading", { level: 1, name: /My bookings/i })
    ).toBeVisible();
    await expect(page.getByRole("cell", { name: "Honda City" })).toBeVisible();
    await expect(page.getByText("2026-04-01")).toBeVisible();
    await expect(page.getByText("2026-04-03")).toBeVisible();
  });

  test("creates a booking from car book page", async ({ page }) => {
    await signInAsDemoUser(page);

    await page.goto("/cars/3/book");
    await expect(
      page.getByRole("heading", { name: /Reserve this car/i })
    ).toBeVisible();

    const pickup = addDays(new Date(), 14);
    const ret = addDays(pickup, 2);
    await page.getByLabel("Pickup date").fill(toInputDate(pickup));
    await page.getByLabel("Return date").fill(toInputDate(ret));
    await page.getByRole("button", { name: "Confirm booking" }).click();

    await expect(page).toHaveURL(/\/my-bookings/);
    await expect(
      page.getByRole("cell", { name: "Maruti Swift", exact: true }).first()
    ).toBeVisible();
  });
});
