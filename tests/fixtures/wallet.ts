import { type Page } from "@playwright/test";
import { type Address, type Hex } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { test as base } from "@playwright/test";
import { type MockParameters } from "wagmi/connectors";

const ACCOUNT_PKEYS = {
  alice: "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80",
  bob: "0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d",
} as const;

export class WalletFixture {
  address?: Address;
  #page: Page;

  constructor({ page }: { page: Page }) {
    this.#page = page;
  }

  async connect(
    name: keyof typeof ACCOUNT_PKEYS,
    features?: MockParameters["features"]
  ) {
    const pkey = ACCOUNT_PKEYS[name];
    const account = privateKeyToAccount(pkey);

    this.address = account.address;

    await this.#setup(pkey, features);
    await this.#login();
  }

  async #login() {
    return this.#page.getByRole("button", { name: "Mock Connector" }).click();
  }

  async #setup(...args: [Hex, MockParameters["features"]]) {
    await this.#page.waitForFunction(() => window._setupAccount);
    await this.#page.evaluate((args) => window._setupAccount(...args), args);
  }
}

export const test = base.extend<{ wallet: WalletFixture }>({
  async wallet({ page }, use) {
    await use(new WalletFixture({ page }));
  },
});
