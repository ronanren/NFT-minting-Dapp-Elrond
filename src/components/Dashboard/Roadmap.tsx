import { Pane, Heading, Text } from 'evergreen-ui';

const Roadmap = () => {
  return (
    <>
      <Pane
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        marginTop={100}
      >
        <Heading textAlign="center" fontSize={60}>
          Roadmap
        </Heading>
        <Text marginTop={50} textAlign="justify">
          Lorem ipsum dolor sit amet, consectetur
          adipiscing elit.mattis felis
          eget odio fringilla, id fermentum dolor lobortis.
        </Text>
        <Text marginTop={50} textAlign="justify">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Cras vitae nulla imperdiet, varius ante quis, cursus risus.
          Nam quis semper neque. Maecenas tincidunt mollis mi id facilisis.
          Integer mollis, mi sit amet
        </Text>
      </Pane>
    </>
  );
};

export default Roadmap;
