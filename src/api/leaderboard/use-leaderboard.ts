import type { AxiosError } from 'axios';
import { createQuery } from 'react-query-kit';

import { client } from '../common';
import type { Leaderboard } from './types';

type Variables = { id: string };
type Response = Leaderboard;

const dummyJson = {
  data: [
    {
      userId: 1,
      name: 'John Doe',
      points: 100,
    },
    {
      userId: 2,
      name: 'Jane Doe',
      points: 200,
    },
    {
      userId: 3,
      name: 'John Smith',
      points: 300,
    },
    {
      userId: 4,
      name: 'Jane Smith',
      points: 400,
    },
    {
      userId: 5,
      name: 'John Johnson',
      points: 500,
    },
    {
      userId: 6,
      name: 'Jane Johnson',
      points: 600,
    },
    {
      userId: 7,
      name: 'John Brown',
      points: 700,
    },
    {
      userId: 8,
      name: 'Jane Brown',
      points: 800,
    },
    {
      userId: 9,
      name: 'John Wilson',
      points: 900,
    },
    {
      userId: 10,
      name: 'Jane Wilson',
      points: 1000,
    },
    {
      userId: 11,
      name: 'John Davis',
      points: 1100,
    },
    {
      userId: 12,
      name: 'Jane Davis',
      points: 1200,
    },
    {
      userId: 13,
      name: 'John Miller',
      points: 1300,
    },
    {
      userId: 14,
      name: 'Jane Miller',
      points: 1400,
    },
    {
      userId: 15,
      name: 'John Garcia',
      points: 1500,
    },
    {
      userId: 16,
      name: 'Jane Garcia',
      points: 1600,
    },
    {
      userId: 17,
      name: 'John Rodriguez',
      points: 1700,
    },
    {
      userId: 18,
      name: 'Jane Rodriguez',
      points: 1800,
    },
    {
      userId: 19,
      name: 'John Martinez',
      points: 1900,
    },
    {
      userId: 20,
      name: 'Jane Martinez',
      points: 2000,
    },
  ],
};

export const useLeaderboard = createQuery<Response, Variables, AxiosError>({
  queryKey: [],
  fetcher: (variables) => {
    // return client
    //   .get(`profiles/${variables.id}`)
    //   .then((response) => response.data);
    return dummyJson;
  },
});
