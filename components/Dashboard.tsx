import { UserData, LeaderboardData } from '@/types';
import { Points } from '@/components/userDashboard/Points';
import { Leaderboard } from '@/components/userDashboard/Leaderboard';
import { InviteCode } from '@/components/userDashboard/InviteCode';
import { Details } from '@/components/userDashboard/Details';
import { PortfolioValue } from '@/components/userDashboard/PortfolioValue';
import { BonusStreak } from '@/components/userDashboard/BonusStreak';
import { Portfolio } from '@/components/userDashboard/Portfolio';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface DashboardProps {
  userData: UserData;
  leaderboardData: LeaderboardData;
}

export default function Dashboard({ userData, leaderboardData }: DashboardProps) {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <main className="container mx-auto py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <PortfolioValue value={10016.12} />
          <Points userData={userData} />
          <BonusStreak />
        </div>
        <Portfolio userData={userData} />
        <Leaderboard leaderboardData={leaderboardData} />
      </main>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
}