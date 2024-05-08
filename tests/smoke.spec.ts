import { expect, test } from "./fixtures";
import { UserRejectedRequestError } from "viem";

test("load the homepage", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle("New Remix App");
});

test("connect wallet", async ({ page, wallet }) => {
  await page.goto("/");
  await wallet.connect("alice");
  await expect(page.getByText(`Connected: ${wallet.address}`)).toBeVisible();
});

test("throw when wallet connect failure", async ({ page, wallet }) => {
  await page.goto("/");
  await Promise.all([
    page.waitForEvent(
      "pageerror",
      (error) => error.name === "UserRejectedRequestError"
    ),
    wallet.connect("alice", {
      connectError: new UserRejectedRequestError(
        new Error("Connection failure.")
      ),
    }),
  ]);
});
