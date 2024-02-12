import { ERRORS } from '@/config/errors';
import { sendError } from '@/lib/errors';
import { ControllerType } from '@/types';
import { getDBUsers } from './getDBUsers';

const getUsers: ControllerType = async (_request, response) => {
  try {
    const users = await getDBUsers();

    response.setHeader('Content-Type', 'application/json');
    response.writeHead(200);
    response.end(JSON.stringify(users, null, 2));
  } catch {
    sendError(response, ERRORS.INTERNAL_SERVER_ERROR);
  }
};

export default getUsers;
