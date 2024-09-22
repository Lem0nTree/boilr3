import { UserData, LeaderboardData } from '@/types';
import { Points, Leaderboard, InviteCode, Details } from '@/components/userDashboard';

interface DashboardProps {
  userData: UserData;
  leaderboardData: LeaderboardData;
}

export default function Dashboard({ userData, leaderboardData }: DashboardProps) {
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