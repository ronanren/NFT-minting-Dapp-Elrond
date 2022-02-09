import * as Dapp from '@elrondnetwork/dapp';

export const walletConnectBridge =
  'https://bridge.walletconnect.org';
export const walletConnectDeepLink = 'https://maiar.page.link/?apn=com.elrond.maiar.wallet&isi=1519405832&ibi=com.elrond.maiar.wallet.dev&link=https://maiar.com/';
export const NFTCollection = 'HANDS1-6f54d8';
export const NFTContract = 'erd1qqqqqqqqqqqqqpgq2z9gqx45wkfrfvsadz0s2vrudq64mt54w90qpa5yan';

export const network: Dapp.NetworkType = {
  id: "devnet",
  name: "devnet",
  egldLabel: "xEGLD",
  walletAddress: "https://devnet-wallet.elrond.com",
  apiAddress: "https://devnet-api.elrond.com",
  gatewayAddress: "https://devnet-gateway.elrond.com",
  explorerAddress: "https://devnet-explorer.elrond.com/",
};