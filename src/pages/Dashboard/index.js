import React from 'react';
import { Container, ButtonSignOut, TextUser } from './styles';
import { useAuth } from '~/contexts/auth';

const Dashboard = () => {
  const { signOut, user } = useAuth();
  function handleSignOut() {
    signOut();
  }

  return (
    <Container>
      <TextUser>{user?.name}</TextUser>
      <ButtonSignOut title="Sign Out" onPress={handleSignOut} />
    </Container>
  );
};

export default Dashboard;
