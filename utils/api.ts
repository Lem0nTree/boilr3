// /utils/api.ts

import { UserData, LeaderboardData } from '@/types';
import { EarnActionsData } from '@/types/earnActions';

const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;


export const fetchUserData = async (address: string): Promise<UserData> => {
  console.log(`Fetching user data for address: ${address}`);
  console.log(`API_BASE_URL: ${API_BASE_URL}`);
  
  try {
    const response = await fetch(`${API_BASE_URL}/user/${address}`);
    console.log(`Response status: ${response.status}`);
    console.log(`Response ok: ${response.ok}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Fetched user data:', data);
    return data;
  } catch (error) {
    console.error('Error in fetchUserData:', error);
    throw error;
  }
};

export const fetchLeaderboardData = async (): Promise<LeaderboardData> => {
  const response = await fetch(`${API_BASE_URL}/leaderboard`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json();
};


export const registerUser = async (address: string, inviteCode: string, signature: string, message: string): Promise<UserData> => {
  const response = await fetch(`${API_BASE_URL}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ 
      address, 
      invitationCode: inviteCode.toUpperCase(),
      signature,
      message
    }),
  });
  if (!response.ok) {
    const errorData = await response.json();
    if (response.status === 400 && errorData.error === "Invalid invitation code") {
      throw new Error("Invalid invitation code");
    }
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json();
};


export const fetchEarnActionsData = async (): Promise<EarnActionsData> => {
  const response = await fetch(`${API_BASE_URL}/earn-actions`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json();
};