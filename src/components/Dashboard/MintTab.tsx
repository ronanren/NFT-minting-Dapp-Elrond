import { Pane, Card, Text, Button, Heading } from 'evergreen-ui';
import { useMediaQuery } from 'react-responsive';
import previewNFT from '../../static/media/previewNFT.gif';
import Roadmap from './Roadmap';
import * as Dapp from '@elrondnetwork/dapp';
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
  const smallRes = useMediaQuery({
    query: '(max-width: 600px)',
  });

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
      receiver: 'erd1qqqqqqqqqqqqqpgqcuydf56ueqxqv6recm94pfp5llw8unwvw90qm62d5r',
      gasLimit: 120000000,
      gasPrice: 10000000000,
      chainID: 'D',
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
            <Text fontSize={15}>458/1111</Text>
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
            <Text textAlign="center">
              The NFT project is the home of 1111 algorithmically generated NFT
              spread.
            </Text>
            <Text textAlign="center">
              The minting price increments by 10% for every 100 NFT minted.
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
