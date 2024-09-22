// /components/dashboard/Leaderboard.tsx

import { LeaderboardData } from '@/types';

interface LeaderboardProps {
  leaderboardData: LeaderboardData;
}

export const Leaderboard = ({ leaderboardData }: LeaderboardProps) => {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-4">Leaderboard</h2>
      <table className="w-full">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Address</th>
            <th>Total Points</th>
          </tr>
        </thead>
        <tbody>
          {leaderboardData.slice(0, 15).map((entry, index) => (
            <tr key={entry.address}>
              <td>{index + 1}</td>
              <td>{entry.address.slice(0, 6)}...{entry.address.slice(-4)}</td>
              <td>{entry.totalPoints}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};