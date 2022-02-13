import { Pane, Card, Text, Button, Heading } from 'evergreen-ui';
import { useMediaQuery } from 'react-responsive';
import { useEffect, useRef, useState } from 'react';
import previewNFT from '../../static/media/previewNFT.gif';
import Roadmap from './Roadmap';
import { getRemainingNfts } from '../../apiEndpoints';
import * as Dapp from '@elrondnetwork/dapp';
import { NFTContract } from '../../config';
import { RawTransactionType } from '../../helpers/types';
import useNewTransaction from '../useNewTransaction';
import InputNumber from 'rsuite/InputNumber';
import 'rsuite/dist/rsuite.min.css';

const MintTab = () => {
  const { account, address, explorerAddress } = Dapp.useContext();
  const [remainingNFT, setRemainingNfts] = useState([]);
  const [pending, setPending] = useState(false);
  const mounted = useRef(true);
  const [value, setValue] = useState(null);
  const smallRes = useMediaQuery({
    query: '(max-width: 600px)',
  });

  const DROP_SIZE = 100;
  const DROP_PRICE = 0.2;

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
        setValue(1);
      }
    };
    fetchRemainingNfts();
    return () => {
      mounted.current = false;
    };
  }, [address]);

  const sendTransaction = Dapp.useSendTransaction();
  const newTransaction = useNewTransaction();
  const send =
    (transaction: RawTransactionType) => async (e: React.MouseEvent) => {
      transaction.value = String(DROP_PRICE * value);
      transaction.data = `mint@${String(value).padStart(2, '0')}`;
      e.preventDefault();
      sendTransaction({
        transaction: newTransaction(transaction),
        callbackRoute: "/dashboard",
      });
    };

  const mintTransaction: RawTransactionType = {
    receiver: NFTContract,
    data: "mint",
    value: `${DROP_PRICE}`,
    gasLimit: 40000000,
  };

  const date = new Date(2022, 1, 13, 14, 0, 0);
  const dateForLaunch = Date.now().valueOf() > date.valueOf();

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
            className="card"
          >
            <Heading fontSize={16} className="h2">Current Price:</Heading>
            <Text fontSize={15} className="text">{DROP_PRICE} EGLD</Text>
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
            className="card"
          >
            <Heading fontSize={16} className="h2">Total Minted:</Heading>
            <Text fontSize={15} className="text">{remainingNFT}/{DROP_SIZE}</Text>
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
            className="card"
          >
            <Heading size={600} marginBottom={10} className="h2">
              Mint your own NFT today!
            </Heading>
            <Text textAlign="center" marginTop="10px" className="text">
              Elrond Hands is a collection of 1,000 handcrafted Hands living on the Elrond Blockchain!
            </Text>
            <Text textAlign="center" marginTop="5px" className="text">
              50% of the profits will be donated to an association against discrimination
            </Text>
            <Text textAlign="center" marginTop="5px" className="text">
              With this collection, we want to raise awareness about the dangers of discrimination in our world
            </Text>
            <Pane
              display="flex"
              flexDirection={smallRes ? 'column' : 'row'}
              flexWrap="wrap"
              alignItems="center"
              justifyContent="center"
            >
              <div style={{ width: 80, margin: 15, paddingTop: 20 }}>
                <InputNumber min={1} max={10} defaultValue={1} value={value ? value : 1} onChange={setValue} step={1} />
              </div>
              <Button
                marginTop={20}
                appearance="primary"
                fontSize={14}
                paddingTop={20}
                paddingBottom={20}
                onClick={send(mintTransaction)}
                disabled={!dateForLaunch}
              >
                Mint
              </Button>
              <Text textAlign="center" marginTop="15px" marginLeft="10px" className="text">
                Max 10 NFTs per wallet
              </Text>
            </Pane>
          </Card>
        </Pane>
      </Pane >
      <Roadmap />
    </>
  );
};

export default MintTab;
