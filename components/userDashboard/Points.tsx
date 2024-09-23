// File: components\userDashboard\Points.tsx

import { UserData } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface PointsProps {
  userData: UserData;
}

export const Points = ({ userData }: PointsProps) => {
  return (
    <Card className="bg-gray-900 border-gray-800 text-white">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          Points
          <span className="text-sm font-bold text-blue-400">Rank #{userData.ranking}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-3xl font-bold">🌟 {userData.totalPoints.toLocaleString('en-US', {maximumFractionDigits: 2})}</p>
      </CardContent>
    </Card>
  );
};