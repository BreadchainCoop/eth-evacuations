import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  base,
  zora,
  gnosis,
} from "wagmi/chains";

const WALLET_CONNECT_PROJECT_ID =
  process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID;

if (!WALLET_CONNECT_PROJECT_ID)
  throw new Error("NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID not provided");

export const wagmiConfig = getDefaultConfig({
  appName: "Eth Evacuations",
  projectId: WALLET_CONNECT_PROJECT_ID,
  chains: [mainnet, optimism, arbitrum, base, gnosis, zora],
});
