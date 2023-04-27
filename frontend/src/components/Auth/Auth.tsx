import { useState } from 'react';
import { Button, Center, Image, Input, Stack, Text } from '@chakra-ui/react';
import { Session } from 'next-auth';
import { signIn } from 'next-auth/react';
import * as React from 'react';

interface IAuthProps {
  session: Session | null;
  reloadSession: () => void;
}

const Auth: React.FC<IAuthProps> = ({ session, reloadSession }) => {
  const [username, setUsername] = useState('');

  const onSubmit = async () => {
    try {
      /* 
        create mutation to send username to GraphQL api
      */
    } catch (error) {
      console.log('Something went wrong', error);
    }
  };

  return (
    <Center height='100vh'>
      <Stack align='center' spacing={6}>
        {session ? (
          <>
            <Text fontSize='xl'>Create a username</Text>
            <Input
              padding='1.5rem'
              fontSize='medium'
              placeholder='Enter a username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Button onClick={onSubmit} width='100%'>
              Save
            </Button>
          </>
        ) : (
          <>
            <Text fontSize='3xl'>Chatio</Text>
            <Button
              onClick={() => signIn('google')}
              leftIcon={
                <Image
                  height='20px'
                  src='/images/google-logo.png'
                  alt='google logo'
                />
              }
            >
              Continue with Google
            </Button>
          </>
        )}
      </Stack>
    </Center>
  );
};

export default Auth;
