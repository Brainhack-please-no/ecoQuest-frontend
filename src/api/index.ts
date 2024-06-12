import { useAuth } from '@/core';
import { API_URL } from '@/core/env';

export * from './common';
export * from './types';

export const useFetchWithToken = () => {
  const token = useAuth.use.token();
  const signOut = useAuth.use.signOut();

  const fetchWithToken = async (
    route: string,
    method: 'GET' | 'POST',
    body?: Record<string, any>,
    contentType:
      | 'application/json'
      | 'multipart/form-data'
      | undefined = 'application/json'
  ) => {
    const rsp = await fetch(API_URL + route, {
      headers: token
        ? {
            Authorization: `${token.access}`,
            ...(contentType && { 'Content-Type': contentType }),
          }
        : {
            ...(contentType && { 'Content-Type': contentType }),
          },
      method: method,
      body: body
        ? contentType === 'application/json'
          ? JSON.stringify(body)
          : body
        : undefined,
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
