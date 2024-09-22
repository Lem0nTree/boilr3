// /pages/dashboard.tsx
import { GetServerSideProps } from 'next';
import { useAccount } from 'wagmi';
import { fetchUserData, fetchLeaderboardData } from '@/utils/api';
import { UserData, LeaderboardData } from '@/types';
import { Points, InviteCode, Leaderboard, Details } from '@/components/userDashboard';
import { ConnectButton } from '@/components/ConnectButton';

interface DashboardProps {
  userData: UserData | null;
  leaderboardData: LeaderboardData;
}

export default function Dashboard({ userData, leaderboardData }: DashboardProps) {
  const { isConnected } = useAccount();

  if (!isConnected) {
    return (
      <div>
        <h1>Please connect your wallet</h1>
        <ConnectButton />
      </div>
    );
  }

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <Points userData={userData} />
      <InviteCode inviteCode={userData.inviteCode} />
      <Details userData={userData} />
      <Leaderboard leaderboardData={leaderboardData} />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req } = context;
  const address = req.session?.siwe?.address;

  if (!address) {
    return { props: { userData: null, leaderboardData: [] } };
  }

  try {
    const [userData, leaderboardData] = await Promise.all([
      fetchUserData(address),
      fetchLeaderboardData()
    ]);

    return { props: { userData, leaderboardData } };
  } catch (error) {
    console.error('Error fetching data:', error);
    return { props: { userData: null, leaderboardData: [] } };
  }
};