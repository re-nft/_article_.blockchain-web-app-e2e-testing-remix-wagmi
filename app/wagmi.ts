import { createClient, http } from "viem";
import { createConfig } from "wagmi";
import { injected } from "wagmi/connectors";
import { foundry, mainnet } from "wagmi/chains";

const chains = [mainnet, foundry] as const;

export const config = createConfig({
  chains,
  client: ({ chain }) => createClient({ chain, transport: http() }),
  connectors: [injected()],
  ssr: true,
});
