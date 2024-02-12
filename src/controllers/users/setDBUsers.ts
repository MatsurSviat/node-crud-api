import { DB_PORT } from '@/config/server';
import { UserType } from '@/types';

export const setDBUsers: (users: UserType[]) => Promise<void> = async (users) => {
  const response = await fetch(`http://localhost:${DB_PORT}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(users),
  });

  if (!response.ok) {
    throw Error('');
  }
};
