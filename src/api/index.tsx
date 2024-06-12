import { useAuth } from '@/core';
import { API_URL } from '@/core/env';

export * from './common';
export * from './profile';
export * from './types';

export const useFetchWithToken = () => {
  const token = useAuth.use.token();
  const signOut = useAuth.use.signOut();

  const fetchWithToken = async (
    route: string,
    method: 'GET' | 'POST',
    body?: Record<string, any>
  ) => {
    const rsp = await fetch(API_URL + route, {
      headers: token
        ? {
            Authorization: `${token.access}`,
            'Content-Type': 'application/json',
          }
        : {
            'Content-Type': 'application/json',
          },
      method: method,
      body: body ? JSON.stringify(body) : undefined,
    });
    if (rsp.status === 400) {
      console.log('signout');
      signOut();
      throw new Error('Unauthorized');
    }
    return rsp;
  };

  return { fetchWithToken };
};
