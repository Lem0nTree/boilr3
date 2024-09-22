import { useState, useEffect } from 'react';
import { GetServerSideProps } from 'next';
import { useAccount } from 'wagmi';
import { ConnectButton } from '@/components/ConnectButton';
import Dashboard from '@/components/Dashboard';
import Register from '@/components/Register';
import { UserData, LeaderboardData } from '@/types';
import { fetchUserData, fetchLeaderboardData } from '@/utils/api';

interface HomeProps {
  initialUserData: UserData | null;
  leaderboardData: LeaderboardData;
}

export default function Home({ initialUserData, leaderboardData }: HomeProps) {
  const { isConnected, address } = useAccount();
  const [userData, setUserData] = useState<UserData | null>(initialUserData);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadUserData = async () => {
      if (isConnected && address) {
        try {
          const fetchedUserData = await fetchUserData(address);
          setUserData(fetchedUserData);
        } catch (error) {
          console.error('Error fetching user data:', error);
          setUserData(null);
        }
      } else {
        setUserData(null);
      }
      setIsLoading(false);
    };

    loadUserData();
  }, [isConnected, address]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isConnected) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-3xl font-bold mb-4">Welcome to the Dashboard</h1>
        <p className="text-xl mb-8">Please connect your wallet to continue.</p>
        <ConnectButton />
      </div>
    );
  }

  if (userData) {
    return <Dashboard userData={userData} leaderboardData={leaderboardData} />;
  }

  return (
    <Register
      onRegisterSuccess={(newUserData) => {
        setUserData(newUserData);
      }}
    />
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req } = context;
  let userData = null;
  let leaderboardData: LeaderboardData = [];

  // Assuming you have a way to get the user's address from the session
  const address = req.session?.siwe?.address;

  if (address) {
    try {
      [userData, leaderboardData] = await Promise.all([
        fetchUserData(address),
        fetchLeaderboardData()
      ]);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  return {
    props: {
      initialUserData: userData,
      leaderboardData
    },
  };
};