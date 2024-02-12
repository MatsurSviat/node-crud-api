import { ERRORS } from '@/config/errors';
import { sendError } from '@/lib/errors';
import { isIdValid } from '@/lib/id';
import { getRequestData } from '@/lib/request';
import { ControllerType } from '@/types';
import { getDBUsers } from './getDBUsers';

const getUser: ControllerType = async (request, response) => {
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

    response.setHeader('Content-Type', 'application/json');
    response.writeHead(200);
    response.end(JSON.stringify(user, null, 2));
  } catch {
    sendError(response, ERRORS.INTERNAL_SERVER_ERROR);
  }
};

export default getUser;
