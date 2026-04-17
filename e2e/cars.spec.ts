import { expect, test } from "@playwright/test";

test.describe("Cars catalog page (/cars)", () => {
  test("lists all vehicles by default", async ({ page }) => {
    await page.goto("/cars");

    await expect(
      page.getByRole("heading", { level: 1, name: /Browse cars/i })
    ).toBeVisible();
    await expect(page.getByText(/data\/cars\.json/i)).toBeVisible();
    await expect(page.getByText(/Showing 10 of 10 vehicles/i)).toBeVisible();
    await expect(
      page.getByRole("link", { name: "View Details" }).first()
    ).toBeVisible();
  });

  test("search filters the grid and can show empty state", async ({
    page,
  }) => {
    await page.goto("/cars");

    const search = page.getByRole("textbox", { name: /Search by name/i });
    await search.fill("Swift");
    await expect(page.getByText(/Maruti Swift/i).first()).toBeVisible();
    await expect(page.getByText(/Showing 1 of 10 vehicles/i)).toBeVisible();

    await search.fill("___no_such_car___");
    await expect(
      page.getByText(/No cars match your filters/i)
    ).toBeVisible();
  });

  test("fuel select narrows results", async ({ page }) => {
    await page.goto("/cars");

    const fuelTrigger = page.locator('[data-slot="select-trigger"]').nth(0);
    await fuelTrigger.click();
    await page.getByRole("option", { name: "Diesel", exact: true }).click();

    await expect(page.getByText(/of 10 vehicles/i)).toBeVisible();
    const countText = await page
      .getByText(/^Showing \d+ of 10 vehicles$/)
      .textContent();
    expect(countText).toMatch(/^Showing [1-9] of 10 vehicles$/);
  });
});
