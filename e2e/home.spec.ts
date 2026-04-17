import { expect, test } from "@playwright/test";

test.describe("Home page (/)", () => {
  test("shows hero copy and primary CTA", async ({ page }) => {
    await page.goto("/");

    await expect(page).toHaveTitle(/DriveEase/i);
    await expect(
      page.getByRole("heading", {
        level: 1,
        name: /Find Your Perfect Rental Car/i,
      })
    ).toBeVisible();
    await expect(
      page.getByText(/Browse our fleet, compare daily rates/i)
    ).toBeVisible();
  });

  test("Browse Cars navigates to catalog", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: "Browse Cars" }).click();
    await expect(page).toHaveURL(/\/cars$/);
    await expect(
      page.getByRole("heading", { level: 1, name: /Browse cars/i })
    ).toBeVisible();
  });

  test("layout: brand and desktop nav links", async ({ page }) => {
    await page.goto("/");
    await expect(
      page.getByRole("link", { name: "DriveEase", exact: true })
    ).toBeVisible();
    await expect(
      page.getByRole("navigation").getByRole("link", { name: "Home" })
    ).toBeVisible();
    await expect(
      page.getByRole("navigation").getByRole("link", { name: "Cars" })
    ).toBeVisible();
    await expect(
      page.getByRole("navigation").getByRole("link", { name: "Login" })
    ).toBeVisible();
  });
});
