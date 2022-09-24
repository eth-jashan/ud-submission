import { UAuthConnector } from "@uauth/web3-react";

import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";

// Instanciate your other connectors.
export const injected = new InjectedConnector({ supportedChainIds: [1] });

export const walletconnect = new WalletConnectConnector({
  infuraId: "4e1b02e3ab7e4877a0cf043079ace9e5",
  qrcode: true,
});

export const uauth = new UAuthConnector({
  clientID: "316afdd4-8b6f-4e6c-8891-c1d22ce96112",
  redirectUri: "http://localhost:3000",
  scope: "openid wallet",
  // Injected and walletconnect connectors are required
  connectors: { injected, walletconnect },
});

const connectors = {
  uauth,
};

export default connectors;
