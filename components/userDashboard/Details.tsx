// /components/dashboard/Details.tsx

import { UserData } from '@/types';

interface DetailsProps {
  userData: UserData;
}

export const Details = ({ userData }: DetailsProps) => {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-4">Point Breakdown</h2>
      <ul>
        <li>Holding Points: {userData.holdingPoints}</li>
        <li>Swap Points: {userData.swapPoints}</li>
        <li>Contract Points: {userData.contractPoints}</li>
        <li>Referral Points: {userData.referralPoints}</li>
      </ul>
    </div>
  );
};