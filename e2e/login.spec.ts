import { expect, test } from "@playwright/test";

test.describe("Login page (/login)", () => {
  test("shows placeholder copy and link home", async ({ page }) => {
    await page.goto("/login");

    await expect(
      page.getByRole("heading", { level: 1, name: "Login" })
    ).toBeVisible();
    await expect(page.getByText(/Phase 3/i)).toBeVisible();
    await expect(
      page.getByRole("link", { name: "Back to home" })
    ).toBeVisible();

    await page.getByRole("link", { name: "Back to home" }).click();
    await expect(page).toHaveURL(/\/$/);
  });
});
