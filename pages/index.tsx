import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { ConnectButton } from '@/components/ConnectButton';
import Dashboard from '@/components/Dashboard';
import Register from '@/components/Register';
import { UserData, LeaderboardData } from '@/types';
import { fetchUserData, fetchLeaderboardData } from '@/utils/api';

export default function Home() {
  const { isConnected, address } = useAccount();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardData>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      if (isConnected && address) {
        try {
          const [user, leaderboard] = await Promise.all([
            fetchUserData(address),
            fetchLeaderboardData()
          ]);
          setUserData(user);
          setLeaderboardData(leaderboard);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
      setLoading(false);
    }

    fetchData();
  }, [isConnected, address]);

  if (!isConnected) {
    return (
      <div>
        <h1>Welcome to the Dashboard</h1>
        <p>Please connect your wallet to continue.</p>
        <ConnectButton />
      </div>
    );
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (userData) {
    return <Dashboard userData={userData} leaderboardData={leaderboardData} />;
  }

  return <Register onRegisterSuccess={() => window.location.reload()} />;
}