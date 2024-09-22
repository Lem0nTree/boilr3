import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const BonusStreak = () => {
  return (
    <Card className="bg-gray-900 border-gray-800 text-white">
      <CardHeader>
        <CardTitle>Bonus Streak</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm mb-2">Earn an increasing amount of bonus points for each day in AsteroNEO pair without decreasing your position</p>
        <p className="font-bold">Bonus Points Earned: 0</p>
        <div className="flex justify-between items-center mt-2">
          <span>Days: 10</span>
          <span>Multiplier: 1.2x</span>
        </div>
        <p className="text-xs text-gray-400 mt-2">Updates daily</p>
      </CardContent>
    </Card>
  );
};