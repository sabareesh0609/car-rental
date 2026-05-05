import { expect, test, type Page } from "@playwright/test";

async function signInAsAdmin(page: Page) {
  await page.goto("/login");
  await page.getByLabel("Email").fill("admin@gmail.com");
  await page.getByLabel("Password").fill("admin123");
  await page.getByRole("button", { name: "Sign in" }).click();
  await expect(page).toHaveURL(/\/admin\/dashboard$/);
}

async function signInAsUser(page: Page) {
  await page.goto("/login");
  await page.getByLabel("Email").fill("user@gmail.com");
  await page.getByLabel("Password").fill("123456");
  await page.getByRole("button", { name: "Sign in" }).click();
  await expect(page).toHaveURL(/\/$/);
}

test.describe("Admin panel (Phase 5)", () => {
  test.describe.configure({ mode: "serial" });

  test("redirects non-admin users away from admin routes", async ({ page }) => {
    await signInAsUser(page);
    await page.goto("/admin/cars");
    await expect(page).toHaveURL(/\/$/);
  });

  test("shows dashboard stats and navigation for admin users", async ({ page }) => {
    await signInAsAdmin(page);

    const adminSidebar = page.getByRole("complementary");

    await expect(
      page.getByRole("heading", { level: 1, name: "Admin dashboard" })
    ).toBeVisible();
    await expect(page.getByText("Total cars")).toBeVisible();
    await expect(page.getByText("Total bookings")).toBeVisible();
    await expect(adminSidebar.getByRole("link", { name: "Cars" })).toBeVisible();
    await expect(
      adminSidebar.getByRole("link", { name: "Bookings" })
    ).toBeVisible();
  });

  test("creates, edits, and deletes a car", async ({ page }) => {
    const suffix = Date.now();
    const createdName = `Playwright Admin Car ${suffix}`;
    const updatedName = `${createdName} Updated`;

    await signInAsAdmin(page);
    await page.goto("/admin/cars");

    await page.getByLabel("Car name").fill(createdName);
    await page.getByLabel("Fuel").fill("Hybrid");
    await page.getByLabel("Seats").fill("4");
    await page.getByLabel("Daily price (INR)").fill("4100");
    await page.getByLabel("Image URLs").fill(
      "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=1200&q=80"
    );
    await page.getByLabel("Description").fill("Created from the admin Playwright test.");
    await page.getByRole("button", { name: "Add car" }).click();

    await expect(page).toHaveURL(/\/admin\/cars$/);
    await expect(page.getByText("Car created.")).toBeVisible();

    const createdRow = page.getByRole("row").filter({ hasText: createdName });
    await expect(createdRow).toBeVisible();

    await createdRow.getByRole("link", { name: "Edit" }).click();
    await expect(page).toHaveURL(/\/admin\/cars\?edit=\d+$/);

    await page.getByLabel("Car name").fill(updatedName);
    await page.getByLabel("Daily price (INR)").fill("4500");
    await page.getByRole("button", { name: "Save changes" }).click();

    await expect(page).toHaveURL(/\/admin\/cars$/);
    await expect(page.getByText("Car updated.")).toBeVisible();

    const updatedRow = page.getByRole("row").filter({ hasText: updatedName });
    await expect(updatedRow).toBeVisible();
    await expect(updatedRow).toContainText("₹4,500");

    page.once("dialog", (dialog) => dialog.accept());
    await updatedRow.getByRole("button", { name: "Delete" }).click();

    await expect(page).toHaveURL(/\/admin\/cars$/);
    await expect(page.getByText("Car deleted.")).toBeVisible();
    await expect(page.getByRole("row").filter({ hasText: updatedName })).toHaveCount(0);
  });

  test("updates booking status from the admin bookings screen", async ({ page }) => {
    await signInAsAdmin(page);
    await page.goto("/admin/bookings");

    const bookingRow = page.getByRole("row").filter({ hasText: "#1" });
    const statusSelect = bookingRow.getByLabel("Status for booking 1");

    await statusSelect.selectOption("completed");
    await bookingRow.getByRole("button", { name: "Save" }).click();

    await expect(page).toHaveURL(/\/admin\/bookings(?:\?updated=1)?$/);
    await expect(page.getByText("Booking status updated.")).toBeVisible();
    await expect(page.getByRole("row").filter({ hasText: "#1" })).toContainText(
      "completed"
    );

    const resetRow = page.getByRole("row").filter({ hasText: "#1" });
    await resetRow.getByLabel("Status for booking 1").selectOption("confirmed");
    await resetRow.getByRole("button", { name: "Save" }).click();
    await expect(page).toHaveURL(/\/admin\/bookings(?:\?updated=1)?$/);
  });
});
