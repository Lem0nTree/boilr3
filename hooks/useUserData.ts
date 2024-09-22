import { useState, useEffect, useCallback } from 'react';
import { UserData, LeaderboardData } from '@/types';
import { fetchUserData, fetchLeaderboardData } from '@/utils/api';

export function useUserData(address: string | undefined) {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardData>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    if (address) {
      try {
        const [user, leaderboard] = await Promise.all([
          fetchUserData(address),
          fetchLeaderboardData()
        ]);
        setUserData(user);
        setLeaderboardData(leaderboard);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    setLoading(false);
  }, [address]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const refetchData = useCallback(() => {
    setLoading(true);
    fetchData();
  }, [fetchData]);

  return { userData, leaderboardData, loading, refetchData };
}