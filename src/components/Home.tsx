import MainLayout from './MainLayout';
import { useHistory } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { useEffect, useRef, useState } from 'react';
import { getRemainingNfts } from '../apiEndpoints';
import { NFTContract } from '../config';
import previewNFT from '../static/media/previewNFT.gif';
import { Pane, Button, Text, Card, Heading } from 'evergreen-ui';
import * as Dapp from '@elrondnetwork/dapp';
import Roadmap from './Dashboard/Roadmap';
import Countdown from 'react-countdown';

const Home: React.FC = () => {
  const history = useHistory();
  const { account, address, explorerAddress } = Dapp.useContext();
  const [remainingNFT, setRemainingNfts] = useState([]);
  const [pending, setPending] = useState(false);
  const mounted = useRef(true);

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

  const unlock = () => {
    history.push('/unlock');
  };

  const smallRes = useMediaQuery({
    query: '(max-width: 600px)',
  });

  const date = new Date(2022, 1, 13, 14, 0, 0);

  return (
    <MainLayout>
      <Pane>
        <Pane
          display="flex"
          flexDirection={smallRes ? 'column' : 'row'}
          justifyContent="center"
          alignItems="center"
          marginTop={smallRes ? '20' : '94'}
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
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              className="card"
            >
              <Heading fontSize={16} className="h2">Current Price:</Heading>
              <Text fontSize={15} className="text">0.2 EGLD</Text>
            </Card>
            <Card
              width={smallRes ? '100%' : '40%'}
              height={smallRes ? '20%' : '15%'}
              marginTop={smallRes ? 10 : 15}
              marginBottom={smallRes ? 20 : 15}
              paddingTop={smallRes ? 15 : 15}
              paddingBottom={smallRes ? 15 : 15}
              elevation={1}
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              className="card"
            >
              <Heading fontSize={16} className="h2">Total Minted:</Heading>
              <Text fontSize={15} className="text">{remainingNFT}/100</Text>
            </Card>
            <Card
              width={smallRes ? '100%' : '90%'}
              height={smallRes ? '20%' : '15%'}
              marginTop={smallRes ? 10 : 15}
              marginBottom={smallRes ? 20 : 15}
              paddingTop={smallRes ? 15 : 25}
              paddingBottom={smallRes ? 15 : 25}
              elevation={1}
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
              <Countdown
                date={date}
                renderer={props => <div className='countdown'>{props.days} days and {String(props.hours).padStart(2, '0')}:{String(props.minutes).padStart(2, '0')}:{String(props.seconds).padStart(2, '0')}</div>}
              />
              <Button
                marginTop={20}
                appearance="primary"
                fontSize={14}
                paddingTop={20}
                paddingBottom={20}
                onClick={unlock}
              >
                Unlock
              </Button>
            </Card>
          </Pane>
        </Pane>
      </Pane>
      <Roadmap />
    </MainLayout>
  );
};

export default Home;
