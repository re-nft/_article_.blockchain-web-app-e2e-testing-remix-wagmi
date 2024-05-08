import type { MetaFunction } from "@remix-run/node";
import {
  useAccount,
  useConnect,
  useDisconnect,
  useBlock,
  useSwitchChain,
  useChainId,
} from "wagmi";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const { connectAsync, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const { chains, switchChainAsync } = useSwitchChain();

  const { data: block } = useBlock();
  const blockTime = new Date(Number(block?.timestamp) * 1000).toUTCString();
  const browserTime = new Date().toUTCString();

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <div style={{ padding: 16, marginBottom: 16, border: "solid 1px" }}>
        <p>Block time: {blockTime}</p>
        <p>Browser time: {browserTime}</p>
      </div>

      <div style={{ padding: 16, border: "solid 1px" }}>
        <p>Connected: {address ?? "no"}</p>

        <p style={{ display: "flex", gap: 8 }}>
          Chain:
          {chains.map((chain) => (
            <button
              key={chain.id}
              onClick={() => void switchChainAsync({ chainId: chain.id })}
              type="button"
            >
              {chain.id === chainId && "✅"} {chain.name} ({chain.id})
            </button>
          ))}
        </p>

        <p style={{ display: "flex", gap: 8 }}>
          {isConnected ? (
            <button onClick={() => disconnect()} type="button">
              Disconnect
            </button>
          ) : (
            connectors.map((connector) => (
              <button
                key={connector.id}
                onClick={() => void connectAsync({ connector })}
                type="button"
              >
                {connector.name}
              </button>
            ))
          )}
        </p>
      </div>
    </div>
  );
}
