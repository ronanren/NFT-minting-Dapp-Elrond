import { Pane, Card, Text, Button, Heading } from 'evergreen-ui';
import { useMediaQuery } from 'react-responsive';
import { useEffect, useRef, useState } from 'react';
import previewNFT from '../../static/media/previewNFT.gif';
import Roadmap from './Roadmap';
import { getRemainingNfts } from '../../apiEndpoints';
import * as Dapp from '@elrondnetwork/dapp';
import { NFTContract, network } from '../../config';
import { NetworkConfig } from '@elrondnetwork/erdjs';
import {
  Transaction,
  GasLimit,
  GasPrice,
  Address,
  TransactionPayload,
  Balance,
  ChainID,
  TransactionVersion,
} from '@elrondnetwork/erdjs';

const MintTab = () => {
  const { account, address, explorerAddress } = Dapp.useContext();
  const [remainingNFT, setRemainingNfts] = useState([]);
  const [pending, setPending] = useState(false);
  const mounted = useRef(true);
  const smallRes = useMediaQuery({
    query: '(max-width: 600px)',
  });

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    setPending(true);
    const fetchRemainingNfts = async () => {
      const response = await fetch(getRemainingNfts(), { signal });
      const data = await response.json();
      if (mounted.current) {
        setRemainingNfts(data);
        setPending(false);
      }
    };
    fetchRemainingNfts();
    return () => {
      mounted.current = false;
    };
  }, [address]);

  function createTransactionFromRaw(rawTransaction: {
    value: string;
    receiver: string;
    gasPrice: number;
    gasLimit: number;
    data: string;
    chainID: string;
    version: number;
  }) {
    return new Transaction({
      value: Balance.egld(rawTransaction.value),
      data: TransactionPayload.fromEncoded(rawTransaction.data),
      receiver: new Address(rawTransaction.receiver),
      gasLimit: new GasLimit(rawTransaction.gasLimit),
      gasPrice: new GasPrice(rawTransaction.gasPrice),
      chainID: new ChainID(rawTransaction.chainID),
      version: new TransactionVersion(rawTransaction.version),
    });
  }

  const sendTransaction = Dapp.useSendTransaction();

  const sendTransactionOnClick = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const rawTransaction = {
      value: '0.2',
      data: Buffer.from('mint@01').toString('base64'),
      receiver: NFTContract,
      gasLimit: NetworkConfig.getDefault().MinGasLimit.valueOf() + NetworkConfig.getDefault().GasPerDataByte * Buffer.from(Buffer.from('mint@01').toString('base64')).length,
      gasPrice: 1000000000,
      chainID: NetworkConfig.getDefault().ChainID.valueOf(),
      version: 1,
    };
    const tx = createTransactionFromRaw(rawTransaction);
    sendTransaction({
      transaction: tx,
      callbackRoute: '/dashboard',
    });
  }

  return (
    <>
      <Pane
        display="flex"
        flexDirection={smallRes ? 'column' : 'row'}
        justifyContent="center"
        alignItems="center"
      >
        <img
          src={previewNFT}
          id="preview-nft"
          alt="loading..."
          style={{ margin: 'auto' }}
        />
        <Pane
          display="flex"
          flexDirection={smallRes ? 'column' : 'row'}
          flexWrap="wrap"
          justifyContent="space-around"
          alignItems="center"
        >
          <Card
            width={smallRes ? '100%' : '40%'}
            height={smallRes ? '20%' : '15%'}
            marginTop={smallRes ? 25 : 15}
            marginBottom={smallRes ? 20 : 15}
            paddingTop={smallRes ? 15 : 15}
            paddingBottom={smallRes ? 10 : 15}
            elevation={1}
            backgroundColor="white"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <Heading fontSize={16}>Current Price:</Heading>
            <Text fontSize={15}>0.2 EGLD</Text>
          </Card>
          <Card
            width={smallRes ? '100%' : '40%'}
            height={smallRes ? '20%' : '15%'}
            marginTop={smallRes ? 10 : 15}
            marginBottom={smallRes ? 20 : 15}
            paddingTop={smallRes ? 15 : 15}
            paddingBottom={smallRes ? 15 : 15}
            elevation={1}
            backgroundColor="white"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <Heading fontSize={16}>Total Minted:</Heading>
            <Text fontSize={15}>{remainingNFT}/1111</Text>
          </Card>
          <Card
            width={smallRes ? '100%' : '90%'}
            height={smallRes ? '20%' : '15%'}
            marginTop={smallRes ? 10 : 15}
            marginBottom={smallRes ? 20 : 15}
            paddingTop={smallRes ? 15 : 25}
            paddingBottom={smallRes ? 15 : 25}
            elevation={1}
            backgroundColor="white"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <Heading size={600} marginBottom={10}>
              Mint your own NFT today!
            </Heading>
            <Text textAlign="center" marginTop="10px">
              Elrond Hands is a collection of 1,000 handcrafted Hands living on the Elrond Blockchain!
            </Text>
            <Text textAlign="center" marginTop="5px">
              50% of the profits will be donated to an association against discrimination
            </Text>
            <Text textAlign="center" marginTop="5px">
              With this collection, we want to raise awareness about the dangers of discrimination in our world
            </Text>
            <Button
              marginTop={20}
              appearance="primary"
              fontSize={14}
              paddingTop={20}
              paddingBottom={20}
              onClick={sendTransactionOnClick}
            >
              Mint
            </Button>
          </Card>
        </Pane>
      </Pane>
      <Roadmap />
    </>
  );
};

export default MintTab;
