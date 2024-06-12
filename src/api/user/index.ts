import { useAuth } from '@/core';
import { API_URL } from '@/core/env';
import { useQuery } from '@tanstack/react-query';

const fetchUser = async (id: string) => {
  const { token } = useAuth.getState();
  const response = await fetch(`${API_URL}/users/data/${id}`, {
    headers: {
      Authorization: `${token?.access}`,
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    throw new Error('Failed to fetch user data');
  }
  return response.json();
};

export const useUser = (id: string) => {
  return useQuery({
    queryKey: ['user', id],
    queryFn: () => fetchUser(id),
    refetchOnWindowFocus: true,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
