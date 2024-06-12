import { useAuth } from '@/core';
import { API_URL } from '@/core/env';
import { useQuery } from '@tanstack/react-query';

const fetchQuests = async () => {
  const { token, signOut } = useAuth.getState();
  const response = await fetch(`${API_URL}/quests`, {
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

export const useQuests = () => {
  return useQuery({
    queryKey: ['quests'],
    queryFn: () => fetchQuests(),
    refetchOnWindowFocus: true,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
