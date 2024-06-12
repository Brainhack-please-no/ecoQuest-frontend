import { useAuth } from '@/core';
import { API_URL } from '@/core/env';
import { useQuery } from '@tanstack/react-query';

export const metricMapping = {
  plastic_bags_used: 'No. of plastic bags used',
  plastic_free_packaging: 'No. of items bought with no plastic packaging',
  sustainable_clothing: 'No. of sustainable clothing items bought',
};

const fetchUser = async (id: string) => {
  const { token, signOut } = useAuth.getState();
  const response = await fetch(`${API_URL}/users/data/${id}`, {
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

export const useUser = (id: string, options?: { refreshing: boolean }) => {
  return useQuery({
    queryKey: ['user', id],
    queryFn: () => fetchUser(id),
    refetchOnWindowFocus: true,
    staleTime: 1000 * 60 * 5, // 5 minutes,
    enabled: !options?.refreshing,
  });
};
