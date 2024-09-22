import { UserData } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface PortfolioProps {
  userData: UserData;
}

export const Portfolio = ({ userData }: PortfolioProps) => {
  const portfolioData = [
    { position: 'Hold USDz on any chain', multiplier: '5x', amount: userData.holdingPoints, chain: 'Multichain' },
    { position: 'Swap USDz', multiplier: '1x', amount: userData.swapPoints, chain: 'Multichain' },
    { position: 'Contract Interaction', multiplier: '2x', amount: userData.contractPoints, chain: 'Multichain' },
    { position: 'Referrals', multiplier: '1x', amount: userData.referralPoints, chain: 'N/A' },
  ];

  const formatAmount = (amount: number | undefined) => {
    if (amount === undefined || isNaN(amount)) {
      return '0.00';
    }
    return amount.toLocaleString('en-US', {maximumFractionDigits: 2});
  };

  return (
    <Card className="bg-gray-900 border-gray-800 mb-6 text-white">
      <CardHeader>
        <CardTitle>Portfolio</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Position</TableHead>
              <TableHead>Multiplier</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Chain</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {portfolioData.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.position}</TableCell>
                <TableCell>{item.multiplier}</TableCell>
                <TableCell>{formatAmount(item.amount)}</TableCell>
                <TableCell>{item.chain}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};