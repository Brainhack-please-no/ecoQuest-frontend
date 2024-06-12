import { getItem, removeItem, setItem } from '@/core/storage';

const TOKEN = 'token';

interface User {
  id: string;
  username: string;
  points: number;
  xp: number;
}

export type TokenType = {
  access: string;
};

export const getToken = () => getItem<TokenType>(TOKEN);
export const removeToken = () => removeItem(TOKEN);
export const setToken = (value: TokenType) => setItem<TokenType>(TOKEN, value);

export const getUser = () => getItem<User>('user');
export const setUser = (value: User) => setItem<User>('user', value);
export const removeUser = () => removeItem('user');
