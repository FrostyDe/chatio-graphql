import Auth from '@/components/Auth/Auth';
import Chat from '@/components/Chat/Chat';
import { Box } from '@chakra-ui/react';
import { NextPage, NextPageContext } from 'next';
import { getSession, useSession } from 'next-auth/react';
import { Epilogue } from 'next/font/google';

const epilogue = Epilogue({
  subsets: ['latin'],
});

const Home: NextPage = () => {
  const { data: session } = useSession();

  console.log('SESSION DATA', session);

  const reloadSession = () => {};

  return (
    <Box className={epilogue.className}>
      {session?.user.username ? (
        <Chat />
      ) : (
        <Auth session={session} reloadSession={reloadSession} />
      )}
    </Box>
  );
};

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
}

export default Home;
