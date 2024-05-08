import { mergeTests } from "@playwright/test";

import { test as walletTest } from "./wallet";

export * from "@playwright/test";
export const test = mergeTests(walletTest);
