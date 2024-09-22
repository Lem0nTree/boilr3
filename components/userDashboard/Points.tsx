// /components/dashboard/Points.tsx

import { UserData } from '@/types';

interface PointsProps {
  userData: UserData;
}

export const Points = ({ userData }: PointsProps) => {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-4">Your Points</h2>
      <p className="text-4xl font-bold">{userData.totalPoints}</p>
      <p className="mt-2">Rank: #{userData.rank}</p>
    </div>
  );
};