// File: hooks/useActions.ts

import { useState, useEffect } from 'react';
import { EarnAction, EarnActionsData } from '@/types/earnActions';
import { fetchEarnActionsData } from '@/utils/api';
import { mockEarnActionsData } from '@/mocks/earnActionsData';

export const useActions = () => {
  const [earnActions, setEarnActions] = useState<EarnAction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const processEarnActions = (data: EarnActionsData): EarnAction[] => {
      const actions: EarnAction[] = [];

      // Process swap actions
      data.swap.tokens.forEach((token) => {
        actions.push({
          category: 'swap',
          title: `Swap ${token.tokenName}`,
          multiplier: token.bonusMultiplier,
          description: `Swap ${token.tokenName} on ${data.swap.name} to earn points`
        });
      });

      // Process holding actions
      data.tokens.forEach((token) => {
        actions.push({
          category: 'holding',
          title: `Hold ${token.symbol}`,
          multiplier: token.holdingMultiplier * token.baseMultiplier,
          description: `Hold ${token.symbol} in your wallet to earn points`
        });
      });

      // Process smartcontract actions
      Object.entries(data.smartcontracts.events).forEach(([event, points]) => {
        actions.push({
          category: 'smartcontracts',
          title: `Execute ${event}`,
          multiplier: points * data.smartcontracts.baseMultiplier,
          description: `Execute ${event} on NUSD to earn points`
        });
      });

      return actions;
    };

//     const fetchActions = async () => {
//       try {
//         setLoading(true);
//         const data = await fetchEarnActionsData();
//         const processedActions = processEarnActions(data);
//         setEarnActions(processedActions);
//         setError(null);
//       } catch (err) {
//         setError(err instanceof Error ? err : new Error('An error occurred'));
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchActions();
//   }, []);


const fetchActions = async () => {
    try {
      setLoading(true);
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      const processedActions = processEarnActions(mockEarnActionsData);
      setEarnActions(processedActions);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An error occurred'));
    } finally {
      setLoading(false);
    }
  };

  fetchActions();
}, []);


  return { earnActions, loading, error };
};