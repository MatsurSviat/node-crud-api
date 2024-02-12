import { UserIdType } from '@/types';
import { v4 as newUUID, validate } from 'uuid';

export const isIdValid = (id: UserIdType) => validate(id);

export const generateId: (ids: UserIdType[]) => UserIdType = (ids) => {
  const maxGenerateTimes = 100;

  for (let i = 0; i < maxGenerateTimes; i += 1) {
    const id = newUUID();
    if (!ids.includes(id)) return id;
  }

  throw new Error("Can't generate id");
};
