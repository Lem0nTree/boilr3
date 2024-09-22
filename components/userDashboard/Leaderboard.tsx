// File: components\userDashboard\Leaderboard.tsx

import { LeaderboardData } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface LeaderboardProps {
  leaderboardData: LeaderboardData;
}

export const Leaderboard = ({ leaderboardData }: LeaderboardProps) => {
  return (
    <Card className="bg-gray-900 border-gray-800 text-white">
      <CardHeader>
        <CardTitle>Leaderboard</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Rank</TableHead>
              <TableHead>Address</TableHead>
              <TableHead className="text-right">Points</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leaderboardData.slice(0, 8).map((entry, index) => (
              <TableRow key={entry.address} className={`
                transition-all duration-300 ease-in-out
                ${index < 3 ? 'font-bold' : ''}
                ${index === 0 ? 'text-yellow-400' :
                  index === 1 ? 'text-gray-400' :
                  index === 2 ? 'text-yellow-700' : ''}
              `}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{`${entry.address.slice(0, 6)}...${entry.address.slice(-6)}`}</TableCell>
                <TableCell className="text-right">{entry.totalPoints.toLocaleString('en-US', {maximumFractionDigits: 0})}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};