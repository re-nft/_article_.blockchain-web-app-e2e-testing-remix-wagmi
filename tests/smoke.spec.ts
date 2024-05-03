import { expect, test } from "@playwright/test";

test("load the homepage", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle("New Remix App");
});
