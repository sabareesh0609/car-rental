import { expect, test } from "@playwright/test";

test.describe("Phase 6 polish", () => {
  test("shows friendly custom 404 page", async ({ page }) => {
    await page.goto("/this-route-does-not-exist");
    await expect(
      page.getByRole("heading", { level: 1, name: "Page not found" })
    ).toBeVisible();
    await expect(page.getByRole("link", { name: "Browse cars" })).toBeVisible();
  });

  test("shows toast feedback on invalid login", async ({ page }) => {
    await page.goto("/login");
    await page.getByLabel("Email").fill("user@gmail.com");
    await page.getByLabel("Password").fill("wrong");
    await page.getByRole("button", { name: "Sign in" }).click();
    await expect(page.getByText("Invalid email or password.").first()).toBeVisible();
  });
});
