import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";

const injected = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42]
});

const walletconnect = new WalletConnectConnector({
  rpc: {137: "https://matic-mainnet.chainstacklabs.com"},
  bridge: "https://bridge.walletconnect.org",
  qrcode: true,
  pollingInterval: 15000
});


export const connectors = {
  injected: injected,
  walletConnect: walletconnect
};
