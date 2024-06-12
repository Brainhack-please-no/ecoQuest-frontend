import type { AxiosError } from 'axios';
import { createQuery } from 'react-query-kit';

import { client } from '../common';
import type { Profile } from './types';

type Variables = { id: string };
type Response = Profile;

import { useAuth } from '@/core/auth';

const fetcher = (variables: any) => {
  const { access } = useAuth.use.token();
  const signOut = useAuth.use.signOut();
  console.log('here');
  return client
    .get(`users/data/${variables.id}`, {
      headers: {
        Authorization: `${access}`,
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

export const useProfile = createQuery<Response, Variables, AxiosError>({
  queryKey: ['user'],
  fetcher,
});
