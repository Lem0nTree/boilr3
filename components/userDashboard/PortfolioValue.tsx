import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface PortfolioValueProps {
  value: number;
}

export const PortfolioValue = ({ value }: PortfolioValueProps) => {
  return (
    <Card className="bg-gray-900 border-gray-800 text-white" >
      <CardHeader>
        <CardTitle >Portfolio Value</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-3xl font-bold">
          {value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          <span className="text-sm font-normal"> nUSD</span>
        </p>
      </CardContent>
    </Card>
  );
};