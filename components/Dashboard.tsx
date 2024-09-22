// File: components\Dashboard.tsx

import { UserData, LeaderboardData } from '@/types';
import { Points } from '@/components/userDashboard/Points';
import { Leaderboard } from '@/components/userDashboard/Leaderboard';
import { InviteCode } from '@/components/userDashboard/InviteCode';
import { Details } from '@/components/userDashboard/Details';
import { PortfolioValue } from '@/components/userDashboard/PortfolioValue';
import { BonusStreak } from '@/components/userDashboard/BonusStreak';
import { Portfolio } from '@/components/userDashboard/Portfolio';
import { ToastContainer } from 'react-toastify';
import EarnActions from './earnActions';
import 'react-toastify/dist/ReactToastify.css';

interface DashboardProps {
  userData: UserData;
  leaderboardData: LeaderboardData;
}
export default function Dashboard({ userData, leaderboardData }: DashboardProps) {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <main className="container max-w-7xl w-full mx-auto py-8">
        <div className="grid grid-cols-1 sd:grid-cols-1 md:grid-cols-3 gap-6 mb-6 grid-rows-3 md:grid-rows-[auto,auto,1fr]">
          {/* Top Row: PortfolioValue and Points */}
          <div className="md:col-span-1 md:row-span-1">
            <Points userData={userData} />
          </div>
          <div className="md:col-span-1 md:row-span-1">
            <InviteCode userData={userData} />
          </div>

          {/* Leaderboard takes full height */}
          <div className="md:col-span-1 md:row-span-3">
            <Leaderboard leaderboardData={leaderboardData} />
          </div>

          {/* Portfolio takes 2/3 of the bottom row */}
          <div className="md:col-span-2 md:row-span-2">
            <Portfolio userData={userData} />
          </div>
        </div>
        <EarnActions />

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
