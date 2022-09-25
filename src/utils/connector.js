import { UAuthConnector } from "@uauth/web3-react";

import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";

let redirect_uri = "http://localhost:3000";

// Instanciate your other connectors.
export const injected = new InjectedConnector({
  supportedChainIds: [1, 80001],
});

export const walletconnect = new WalletConnectConnector({
  infuraId: "4e1b02e3ab7e4877a0cf043079ace9e5",
  qrcode: true,
});

export const getUauth = (redirect_uri) =>
  new UAuthConnector({
    clientID: "316afdd4-8b6f-4e6c-8891-c1d22ce96112",
    redirectUri: redirect_uri,
    scope: "openid wallet",
    // Injected and walletconnect connectors are required
    connectors: { injected, walletconnect },
  });

export const setRedirectUri = (redirectUri) => {
  redirect_uri = redirectUri;
  console.log("redirect uri set to", redirect_uri);
};

const connectors = (redirect_uri) => ({
  uauth: getUauth(redirect_uri),
});

export default connectors;
