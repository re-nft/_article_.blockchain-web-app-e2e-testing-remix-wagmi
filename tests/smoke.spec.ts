import { expect, test } from "./fixtures";
import { UserRejectedRequestError } from "viem";

let id: `0x${string}` | undefined;

test.beforeAll(async ({ anvil }) => {
  id = await anvil.snapshot();
});

test.afterAll(async ({ anvil }) => {
  if (!id) return;
  await anvil.revert({ id });
  id = undefined;
});

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

test("synchronize times", async ({ date, page }) => {
  await date.set("2069-04-20");
  await page.goto("/");
  await page.getByRole("button", { name: /Foundry/ }).click();
  await expect(page.getByText(/Block time/)).toHaveText(/Sat, 20 Apr 2069/);
  await expect(page.getByText(/Browser time/)).toHaveText(/Sat, 20 Apr 2069/);
  await date.addDays(69420);
  await page.reload();
  await expect(page.getByText(/Block time/)).toHaveText(/Sun, 15 May 2259/);
  await expect(page.getByText(/Browser time/)).toHaveText(/Sun, 15 May 2259/);
});
