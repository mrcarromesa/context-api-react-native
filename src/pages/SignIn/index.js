import React from 'react';
import { Container, ButtonSigni } from './styles';
import { useAuth } from '~/contexts/auth';

const SignIn = () => {
  const { signed, signIn } = useAuth();

  console.log(signed);

  async function handleSignIn() {
    signIn();
    console.log(signed);
  }

  return (
    <Container>
      <ButtonSigni title="Sign In" onPress={handleSignIn} />
    </Container>
  );
};

export default SignIn;
