import { ERRORS } from '@/config/errors';
import { RequestBodyError, sendError } from '@/lib/errors';
import { isIdValid } from '@/lib/id';
import { getRequestData, getRequestBody, verifyUserBody } from '@/lib/request';
import { ControllerType } from '@/types';
import { getDBUsers } from './getDBUsers';
import { setDBUsers } from './setDBUsers';

const putUser: ControllerType = async (request, response) => {
  try {
    const { pathname } = getRequestData(request);
    const [requestUserId] = pathname.split('/').slice(-1);

    if (!isIdValid(requestUserId)) {
      sendError(response, ERRORS.INVALID_USER_ID);
      return;
    }

    const requestBody = await getRequestBody(request);
    const verifiedUserData = verifyUserBody(requestBody);

    if (verifiedUserData) {
      const users = await getDBUsers();
      const user = users.find(({ id }) => id === requestUserId);

      if (!user) {
        sendError(response, ERRORS.USER_NOT_EXIST);
        return;
      }

      const usersNoUpdate = users.filter(({ id }) => id !== requestUserId);
      const updatedUser = { id: requestUserId, ...verifiedUserData };

      await setDBUsers([...usersNoUpdate, updatedUser]);

      response.setHeader('Content-Type', 'application/json');
      response.writeHead(200);
      response.end(JSON.stringify(updatedUser, null, 2));
    } else throw new RequestBodyError();
  } catch (error) {
    if (error instanceof RequestBodyError) {
      sendError(response, ERRORS.INVALID_USER_BODY);
    } else {
      sendError(response, ERRORS.INTERNAL_SERVER_ERROR);
    }
  }
};

export default putUser;
