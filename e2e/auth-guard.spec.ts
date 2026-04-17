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
});
