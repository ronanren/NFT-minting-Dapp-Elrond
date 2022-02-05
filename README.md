# NFT-minting-Dapp-Elrond
NFT minting Dapp for Elrond Blockchain⚡

```
npm install
npm start
```

### Create NFT

I use https://github.com/juliancwirko/nft-art-maker to making NFT and host them on IPFS with nft.storage

### Deploy NFT

```
npm install elven-tools -g
```

Create wallet with https://wallet.elrond.com or https://devnet-wallet.elrond.com

You can claim faucet to have xEGLD to testing on devnet

Create pem key wallet
```
elven-tools derive-pem
```

Deploy NFT
```
elven-tools deploy nft-minter
elven-tools nft-minter issue-collection-token
elven-tools nft-minter set-roles
elven-tools nft-minter start-minting
elven-tools nft-minter shuffle
```

### Configuration

**Make sure that you have .env.local file:** `cp .env.devnet.example .env.local`

There are examples are for the devnet and the testnet in separate files: `.env.devnet.example` and `.env.testnet.example`.

Dependencies: 

- React with Typescript
- [@elrondnetwork/dapp](https://github.com/ElrondNetwork/dapp),
- [@elrondnetwork/dapp-utils](https://github.com/ElrondNetwork/dapp-utils),
- [@elrondnetwork/erdjs](https://github.com/ElrondNetwork/elrond-sdk-erdjs),
- [evergreen-ui](https://evergreen.segment.com/),
- Prettier and Eslint configured to work with Typescript

 Just a custom one, remember that there is an official [dapp-template](https://github.com/ElrondNetwork/dapp-template)
 
 #### Contact me: 

 - [Twitter](https://twitter.com/ronanren)
