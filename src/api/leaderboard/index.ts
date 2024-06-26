import { useAuth } from '@/core';
import { API_URL } from '@/core/env';
import { useQuery } from '@tanstack/react-query';

const fetchLeaderboard = async () => {
  const { token, signOut } = useAuth.getState();
  const response = await fetch(`${API_URL}/leaderboard`, {
    headers: {
      Authorization: `${token?.access}`,
      'Content-Type': 'application/json',
    },
  });
  if (response.status === 400) {
    signOut();
  }
  if (!response.ok) {
    throw new Error('Failed to fetch user data');
  }
  return response.json();
};

export const useLeaderboard = () => {
  return useQuery({
    queryKey: ['leaderboard'],
    queryFn: () => fetchLeaderboard(),
    refetchOnWindowFocus: true,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
