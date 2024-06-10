import type { AxiosError } from 'axios';
import { createQuery } from 'react-query-kit';

import { client } from '../common';
import type { Profile } from './types';

type Variables = { id: string };
type Response = Profile;

const dummyJson = {
  id: '1',
  name: 'John Doe',
  friends: ['2', '3', '4'],
  image: 'https://via.placeholder.com/150',
  statistics: [
    {
      name: 'Total distance',
      value: 100,
    },
    {
      name: 'Total time',
      value: 100,
    },
    {
      name: 'Total steps',
      value: 100,
    },
    {
      name: 'Eco friendly wood veneers bought',
      value: 10,
    },
  ],
  medals: [
    {
      name: 'Gold',
      description: 'You have made it to the top 10% of your friends',
      image: 'https://via.placeholder.com/150',
    },
    {
      name: 'Gold',
      description: 'You have made it to the top 10% of your friends',
      image: 'https://via.placeholder.com/150',
    },
  ],
};

export const useProfile = createQuery<Response, Variables, AxiosError>({
  queryKey: ['profile'],
  fetcher: (variables) => {
    // return client
    //   .get(`profiles/${variables.id}`)
    //   .then((response) => response.data);
    return dummyJson;
  },
});
