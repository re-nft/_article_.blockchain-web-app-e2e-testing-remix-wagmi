import { test as base } from "./anvil";

export const test = base.extend<{
  date: {
    addDays: (days: number) => Promise<Date>;
    set: (value: number | string | Date) => Promise<Date>;
  };
}>({
  async date({ anvil, page }, use) {
    let date = new Date();

    async function addDays(days: number) {
      date = new Date(date.setDate(date.getDate() + days));
      return set(date);
    }

    async function set(value: number | string | Date) {
      date = new Date(value);

      try {
        await anvil.syncDate(date);
      } catch (error) {
        console.error(error);
      }

      const dateInit = date.valueOf();
      const datePatch = `
      Date = class extends Date {
        constructor(...args) {
          super(...args.length ? args : [${dateInit}]);
        }

        now() {
          return super.now() + (${dateInit} - super.now());
        }
      };
      `;

      await page.addInitScript(datePatch);
      await page.evaluate((datePatch) => {
        // eslint-disable-next-line no-eval
        eval(datePatch);
      }, datePatch);

      return date;
    }

    await use({ addDays, set });
  },
});
