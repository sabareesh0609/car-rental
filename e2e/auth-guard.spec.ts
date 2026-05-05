import { expect, test } from "@playwright/test";

test.describe("Route guards (Phase 3)", () => {
  test("redirects guests from /my-bookings to login with callback", async ({
    page,
  }) => {
    await page.goto("/my-bookings");
    await expect(page).toHaveURL(/\/login\?callbackUrl=%2Fmy-bookings/);
  });

  test("redirects guests from /admin/dashboard to login", async ({ page }) => {
    await page.goto("/admin/dashboard");
    await expect(page).toHaveURL(
      /\/login\?callbackUrl=%2Fadmin%2Fdashboard/
    );
  });

  test("redirects guests from car book route to login", async ({ page }) => {
    await page.goto("/cars/1/book");
    await expect(page).toHaveURL(
      /\/login\?callbackUrl=%2Fcars%2F1%2Fbook$/
    );
  });
});
