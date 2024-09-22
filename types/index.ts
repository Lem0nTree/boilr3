// /types/index.ts

export interface UserData {
    address: string;
    totalPoints: number;
    rank: number;
    inviteCode: string;
    holdingPoints?: number;
    swapPoints?: number;
    contractPoints?: number;
    referralPoints?: number;
  }
  
  export interface LeaderboardEntry {
    address: string;
    totalPoints: number;
    holdingPoints: number;
    swapPoints: number;
    contractPoints: number;
  }
  
  export type LeaderboardData = LeaderboardEntry[];