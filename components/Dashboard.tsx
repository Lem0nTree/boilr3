// /components/Dashboard.tsx

import { UserData } from '@/types';
import { Points, Leaderboard, InviteCode, Details } from '@/components/userDashboard';

interface DashboardProps {
  userData: UserData;
}

export default function Dashboard({ userData }: DashboardProps) {
  return (
    <div>
      <h1>Dashboard</h1>
      <Points userData={userData} />
      <InviteCode inviteCode={userData.inviteCode} />
      <Details userData={userData} />
      <Leaderboard leaderboardData={[]} /> {/* TODO: Fetch leaderboard data */}
    </div>
  );
}