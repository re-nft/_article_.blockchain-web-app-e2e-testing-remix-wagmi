# Blockchain Application Testing 101

This is the accompanying demo repository for our [article on testing blockchain applications with Playwright, Anvil, and Wagmi](https://paragraph.xyz/@021/end-to-end-testing-blockchain-applications-episode-2). Be sure to check it out if you need any extra guidance!

## Setting up

Make sure you have a relatively recent version of [Node](https://nodejs.org/en) installed. Make sure you have [Foundry's Anvil](https://book.getfoundry.sh/) (or a comparable testnet node service) installed.

```
npm install
```

## Development

Run the Vite dev server:

```shellscript
npm run dev
```

Run the following in parallel:

```shellscript
anvil
```

## Testing

When you have the development server and anvil running, it's very helpful to
run tests with Playwright's UI mode:

```shellscript
npm test -- --ui
```

If you want to test against a prod build and have anvil spun up automatically:

```shellscript
npm run build
npm test
```
