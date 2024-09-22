// /pages/dashboard.tsx

import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import { useAccount } from 'wagmi';
import { withIronSessionSsr } from "iron-session/next";

import { Navbar } from '@/components/layout';
import { Points, InviteCode, Leaderboard, Details } from '@/components/userDashboard';
import { fetchUserData, fetchLeaderboardData } from '@/utils/api';
import { UserData, LeaderboardData } from '@/types';
import { ironOptions } from '@/utils/config';


interface DashboardProps {
  userData: UserData;
  leaderboardData: LeaderboardData;
}

const Dashboard = ({ userData, leaderboardData }: DashboardProps) => {
  const router = useRouter();
  const { address, isConnected } = useAccount();

  if (!isConnected || !address) {
    router.push('/');
    return null;
  }

  return (
    <div>
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Points userData={userData} />
          <InviteCode inviteCode={userData.inviteCode} />
          <Details userData={userData} />
          <Leaderboard leaderboardData={leaderboardData} />
        </div>
      </main>
    </div>
  );
};


export const getServerSideProps = withIronSessionSsr(
    async function getServerSideProps(context: GetServerSidePropsContext) {
      const { req } = context;
      const address = req.session.siwe?.address;
  
      if (!address) {
        return {
          redirect: {
            destination: '/',
            permanent: false,
          },
        };
      }
  
      try {
        const userData = await fetchUserData(address);
        const leaderboardData = await fetchLeaderboardData();
  
        return {
          props: {
            userData,
            leaderboardData,
          },
        };
      } catch (error: any) {
        if (error.response?.status === 404) {
          return {
            redirect: {
              destination: '/register',
              permanent: false,
            },
          };
        }

  
        return {
          notFound: true,
        };
      }
    },
    ironOptions
  );

export default Dashboard;