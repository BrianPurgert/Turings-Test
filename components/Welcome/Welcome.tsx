import { Title, Text } from '@mantine/core';
import useStyles from './Welcome.styles';
import { Chat } from '../Chat';

export function Welcome() {
  const { classes } = useStyles();

  return (
    <>
      <Title className={classes.title} align="center" mt={100}>
        Welcome to{' '}
        <Text inherit variant="gradient" component="span">
          Turings Test
        </Text>
      </Title>
      <Chat />
    </>
  );
}
