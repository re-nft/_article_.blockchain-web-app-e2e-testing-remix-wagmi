import { createClient, http, isAddress } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { createConfig } from "wagmi";
import { injected, mock, type MockParameters } from "wagmi/connectors";
import { foundry, mainnet } from "wagmi/chains";

const chains = [mainnet, foundry] as const;

export const config = createConfig({
  chains,
  client: ({ chain }) => createClient({ chain, transport: http() }),
  connectors: [injected()],
  ssr: true,
});

export function createMockConfig(
  addressOrPkey: `0x${string}`,
  features?: MockParameters["features"]
) {
  const account = isAddress(addressOrPkey)
    ? addressOrPkey
    : privateKeyToAccount(addressOrPkey);
  const address = typeof account === "string" ? account : account.address;
  return createConfig({
    connectors: [mock({ accounts: [address], features })],
    chains,
    client: ({ chain }) => createClient({ account, transport: http(), chain }),
    ssr: true,
  });
}
