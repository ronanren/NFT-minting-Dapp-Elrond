import * as Dapp from '@elrondnetwork/dapp';

export const walletConnectBridge: string =
  process.env.REACT_APP_WALLET_CONNECT_BRIDGE || '';
export const walletConnectDeepLink: string =
  process.env.REACT_APP_WALLET_CONNECT_DEEP_LINK || '';
export const NFTCollection: string =
  process.env.NFT_COLLECTION || 'HANDS-c615d8';
export const NFTContract: string =
  process.env.NFTContract || 'erd1qqqqqqqqqqqqqpgqcuydf56ueqxqv6recm94pfp5llw8unwvw90qm62d5r';

export const network: Dapp.NetworkType = {
  id: process.env.REACT_APP_NETWORK_ID || '',
  name: process.env.REACT_APP_NETWORK_NAME || '',
  egldLabel: process.env.REACT_APP_NETWORK_EGLD_LABEL || '',
  walletAddress: process.env.REACT_APP_NETWORK_WALLET_ADDRESS,
  apiAddress: process.env.REACT_APP_NETWORK_API_ADDRESS,
  gatewayAddress: process.env.REACT_APP_NETWORK_GATEWAY_ADDRESS,
  explorerAddress: process.env.REACT_APP_NETWORK_EXPLORER_ADDRESS,
};