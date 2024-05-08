import { mergeTests } from "@playwright/test";

import { test as anvilTest } from "./anvil";
import { test as dateTest } from "./date";
import { test as walletTest } from "./wallet";

export * from "@playwright/test";
export const test = mergeTests(anvilTest, dateTest, walletTest);
