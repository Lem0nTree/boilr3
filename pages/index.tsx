// /pages/index.tsx

import { useAccount } from 'wagmi';
import { ConnectButton } from '@/components/ConnectButton';
import Dashboard from '@/components/Dashboard';
import Register from '@/components/Register';
import { UserData } from '@/types';

interface HomeProps {
  userData: UserData | null;
  loading: boolean;
}

export default function Home({ userData, loading }: HomeProps) {
  const { isConnected } = useAccount();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isConnected) {
    return (
      <div>
        <h1>Welcome to the Dashboard</h1>
        <p>Please connect your wallet to continue.</p>
        <ConnectButton />
      </div>
    );
  }

  if (userData) {
    return <Dashboard userData={userData} />;
  }

  return <Register onRegisterSuccess={(newUserData) => {
    // You might want to update the global state here
    // For now, we'll just reload the page
    window.location.reload();
  }} />;
}