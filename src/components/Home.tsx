import MainLayout from './MainLayout';
import { useHistory } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import previewNFT from '../static/media/previewNFT.gif';
import { Pane, Button, Text, Card, Heading } from 'evergreen-ui';
import Roadmap from './Dashboard/Roadmap';

const Home: React.FC = () => {
  const history = useHistory();

  const unlock = () => {
    history.push('/unlock');
  };

  const smallRes = useMediaQuery({
    query: '(max-width: 600px)',
  });

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
