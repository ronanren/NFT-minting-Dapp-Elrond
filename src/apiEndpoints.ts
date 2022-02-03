import { network, NFTCollection } from './config';

export const getTransactionByHash = (txHash: string) =>
  `${network.apiAddress}/transactions/${txHash}`;

export const getTransactions = (senderAddress: string, from = 0, size = 5) =>
  `${network.apiAddress}/transactions?sender=${senderAddress}&receiver=${senderAddress}&condition=should&from=${from}&size=${size}`;

export const getNfts = (walletAddress: string) =>
  `${network.apiAddress}/accounts/${walletAddress}/nfts`;

export const getRemainingNfts = () =>
  `${network.apiAddress}/nfts/count?collection=${NFTCollection}`;
