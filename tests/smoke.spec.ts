import { expect, test } from "@playwright/test";

test("load the homepage", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle("New Remix App");
});

test("connect wallet", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Mock Connector" }).click();
  await expect(
    page.getByText("Connected: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266")
  ).toBeVisible();
});
