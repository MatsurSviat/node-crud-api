import { ERRORS } from '@/config/errors';
import { sendError } from '@/lib/errors';
import { isIdValid } from '@/lib/id';
import { getRequestData } from '@/lib/request';
import { ControllerType } from '@/types';
import { getDBUsers } from './getDBUsers';
import { setDBUsers } from './setDBUsers';

const deleteUser: ControllerType = async (request, response) => {
  try {
    const { pathname } = getRequestData(request);
    const [requestUserId] = pathname.split('/').slice(-1);

    if (!isIdValid(requestUserId)) {
      sendError(response, ERRORS.INVALID_USER_ID);
      return;
    }

    const users = await getDBUsers();

    const user = users.find(({ id }) => id === requestUserId);

    if (!user) {
      sendError(response, ERRORS.USER_NOT_EXIST);
      return;
    }

    const newUsers = users.filter(({ id }) => id !== requestUserId);

    await setDBUsers(newUsers);

    response.setHeader('Content-Type', 'application/json');
    response.writeHead(204);
    response.end();
  } catch {
    sendError(response, ERRORS.INTERNAL_SERVER_ERROR);
  }
};

export default deleteUser;
