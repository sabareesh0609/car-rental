import { expect, test } from "@playwright/test";

test.describe("Login page (/login)", () => {
  test("shows sign-in form and demo hint", async ({ page }) => {
    await page.goto("/login");

    await expect(
      page.getByRole("heading", { level: 1, name: "Login" })
    ).toBeVisible();
    await expect(page.getByLabel("Email")).toBeVisible();
    await expect(page.getByLabel("Password")).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Sign in" })
    ).toBeVisible();
    await expect(page.getByText(/user@gmail\.com/i)).toBeVisible();

    await page.getByRole("link", { name: "Back to home" }).click();
    await expect(page).toHaveURL(/\/$/);
  });

  test("rejects bad credentials", async ({ page }) => {
    await page.goto("/login");
    await page.getByLabel("Email").fill("user@gmail.com");
    await page.getByLabel("Password").fill("wrong");
    await page.getByRole("button", { name: "Sign in" }).click();
    await expect(
      page.getByRole("alert").filter({ hasText: /invalid email or password/i })
    ).toBeVisible();
  });

  test("logs in as user and reaches callback URL", async ({ page }) => {
    await page.goto("/login?callbackUrl=%2Fcars%2F1");
    await page.getByLabel("Email").fill("user@gmail.com");
    await page.getByLabel("Password").fill("123456");
    await page.getByRole("button", { name: "Sign in" }).click();
    await expect(page).toHaveURL(/\/cars\/1$/);
  });

  test("logs in as admin and lands on admin dashboard", async ({ page }) => {
    await page.goto("/login");
    await page.getByLabel("Email").fill("admin@gmail.com");
    await page.getByLabel("Password").fill("admin123");
    await page.getByRole("button", { name: "Sign in" }).click();
    await expect(page).toHaveURL(/\/admin\/dashboard$/);
  });
});
