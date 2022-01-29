import { Ui } from '@elrondnetwork/dapp-utils';
import { Pane, Heading, Paragraph, Link, Text, Card, Spinner, Image } from 'evergreen-ui';
import { useMediaQuery } from 'react-responsive';
import * as Dapp from '@elrondnetwork/dapp';
import { getNfts } from '../../apiEndpoints';
import { useEffect, useRef, useState } from 'react';

const AccountTab = () => {
  const { account, address, explorerAddress } = Dapp.useContext();
  const [nfts, setNftsList] = useState([]);
  const [pending, setPending] = useState(false);
  const mounted = useRef(true);

  const smallRes = useMediaQuery({
    query: '(max-width: 600px)',
  });

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    setPending(true);
    const fetchNfts = async () => {
      const response = await fetch(getNfts(address), { signal });
      const data = await response.json();
      if (mounted.current) {
        console.log(data);
        setNftsList(data);
        setPending(false);
      }
    };
    if (address) {
      fetchNfts();
    }
    return () => {
      mounted.current = false;
    };
  }, [address]);

  return (
    <>
      <Pane display="flex" flexDirection={smallRes ? 'column' : 'row'}>
        <Card
          width={smallRes ? '100%' : '50%'}
          marginRight={smallRes ? 0 : 10}
          marginBottom={25}
          padding={30}
          elevation={1}
          backgroundColor="white"
        >
          <Heading size={700} marginBottom={10}>
            Your wallet address:
          </Heading>
          <Paragraph data-testid="accountTab-address">
            <Link href={`${explorerAddress}accounts/${address}`}>
              <Text wordWrap="break-word">{address}</Text>
            </Link>
          </Paragraph>
        </Card>

        <Card
          width={smallRes ? '100%' : '50%'}
          marginLeft={smallRes ? 0 : 10}
          marginBottom={25}
          padding={30}
          elevation={1}
          backgroundColor="white"
        >
          <Heading size={700} marginBottom={10}>
            Your wallet balance:
          </Heading>
          <Paragraph data-testid="accountTab-balance">
            <Ui.Denominate value={account.balance} erdLabel="xEGLD" />
          </Paragraph>
        </Card>
      </Pane>
      <Pane marginBottom={30} marginTop={30}>
        <Heading size={700}>Your NFTs:</Heading>
      </Pane>
      <Pane
        display="flex"
        flexWrap="wrap"
        flexDirection={smallRes ? 'column' : 'row'}
        justifyContent="start"
        alignItems="center">
        {pending ? (
          <Spinner marginX="auto" marginY="auto" />
        ) : (
          nfts.map((nft: any, index: number) => (
            <Card
              backgroundColor="white"
              width={smallRes ? '100%' : '20%'}
              marginTop={10}
              marginBottom={10}
              marginLeft={smallRes ? '0' : '50px'}
              paddingTop={20}
              paddingBottom={20}
              elevation={1}
              key={index}
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
            >
              <Image src={nft.media[0].originalUrl} alt="NFT image" width={200} />
              <Heading>{nft.name}</Heading>
              <Pane>
                <Text fontSize={12}>Collection: </Text>
                <Link href={`${explorerAddress}collections/${nft.collection}`}>
                  <Text
                    color="gray800"
                    fontSize={12}
                    textDecoration="underline"
                  >
                    {nft.collection}
                  </Text>
                </Link>
              </Pane>
              <Pane marginBottom={10}>
                <Text fontSize={12}>Id: </Text>
                <Link href={`${explorerAddress}nfts/${nft.identifier}`}>
                  <Text
                    color="gray800"
                    fontSize={12}
                    textDecoration="underline"
                  >
                    {nft.identifier}
                  </Text>
                </Link>
              </Pane>
              {nft.uris?.[0] && (
                <Pane is="a" href={atob(nft.uris[0])}>
                  <Pane
                    is="img"
                    src={atob(nft.uris[0])}
                    maxWidth="100%"
                    width="auto"
                  />
                </Pane>
              )}
            </Card>
          ))
        )}
        {!pending && nfts.length === 0 && <Text>There are no NFTs yet.</Text>}
      </Pane>
    </>
  );
};

export default AccountTab;
