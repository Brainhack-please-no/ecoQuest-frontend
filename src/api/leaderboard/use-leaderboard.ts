import type { AxiosError } from 'axios';
import { createQuery } from 'react-query-kit';

import { client } from '../common';
import type { Leaderboard } from './types';

type Variables = { id: string };
type Response = Leaderboard;

import { useAuth } from '@/core/auth';

const fetcher = (variables: any) => {
  const { token } = useAuth.getState();
  const signOut = useAuth.use.signOut();
  console.log('im here');
  return client
    .get(`leaderboard`, {
      headers: {
        Authorization: `${token?.access}`,
      },
    })
    .then((response) => {
      console.log(response);
      if (response.status === 400) {
        console.log('logout');
        signOut();
      }
      return response.data;
    });
};

export const useLeaderboard = createQuery<Response, Variables, AxiosError>({
  queryKey: [],
  fetcher,
});
