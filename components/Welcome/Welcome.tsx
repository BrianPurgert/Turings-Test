import { Title, Text, Container } from '@mantine/core';
import useStyles from './Welcome.styles';
import { Chat } from '../Chat';
import { Image, Grid, Skeleton, Center } from '@mantine/core';

const child = <Skeleton height={380} radius="xs" animate={false} />;

export function Welcome() {
  const { classes } = useStyles();

  return (
    <>
      <Container fluid={true} px={0}>
        <Grid gutter={5} gutterXs="md" gutterMd="xl" gutterXl={50}>
          <Grid.Col xs={3}>
            <Image src="/tt_left.svg" alt="robot" />
          </Grid.Col>
          <Grid.Col xs={6}>
            <Center maw={400} h={100} mx="auto">
              <Chat />
            </Center>
          </Grid.Col>
          <Grid.Col xs={3}>
            <Image src="/tt_right.svg" alt="robot" />
          </Grid.Col>
        </Grid>
      </Container>

      <Container></Container>
    </>
  );
}
