import { DB_PORT } from '@/config/server';
import { UserType } from '@/types';

export const getDBUsers: () => Promise<UserType[]> = async () => {
  const response = await fetch(`http://localhost:${DB_PORT}`);
  const users = await response.json();
  return users;
};
