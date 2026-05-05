import { expect, test } from "@playwright/test";

test.describe("Car detail page (/cars/[id])", () => {
  test("renders car metadata and booking CTA when available", async ({
    page,
  }) => {
    await page.goto("/cars/1");

    await expect(page).toHaveTitle(/Toyota Innova Crysta/i);
    await expect(
      page.getByRole("heading", { level: 1, name: "Toyota Innova Crysta" })
    ).toBeVisible();
    await expect(page.getByText("Available")).toBeVisible();
    await expect(page.getByText("Seats")).toBeVisible();
    await expect(page.getByText("Diesel")).toBeVisible();
    await expect(page.getByText("Description")).toBeVisible();

    const book = page.getByRole("link", { name: "Book Now" });
    await expect(book).toBeVisible();
    await expect(book).not.toHaveAttribute("aria-disabled", "true");
    await expect(book).toHaveAttribute(
      "href",
      "/login?callbackUrl=%2Fcars%2F1%2Fbook"
    );
  });

  test("disables Book Now when car is unavailable", async ({ page }) => {
    await page.goto("/cars/5");

    await expect(
      page.getByRole("heading", { level: 1, name: "Ford EcoSport" })
    ).toBeVisible();
    await expect(page.getByText("Unavailable")).toBeVisible();

    const book = page.getByRole("link", { name: "Book Now" });
    await expect(book).toHaveAttribute("aria-disabled", "true");
    await expect(book).toHaveClass(/pointer-events-none/);
  });

  test("Back to cars returns to catalog", async ({ page }) => {
    await page.goto("/cars/2");
    await page.getByRole("link", { name: /Back to cars/i }).click();
    await expect(page).toHaveURL(/\/cars$/);
  });

  test("unknown id returns 404", async ({ page }) => {
    const response = await page.goto("/cars/99999");
    expect(response?.status()).toBe(404);
  });
});
