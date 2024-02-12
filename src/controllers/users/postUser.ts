import { ERRORS } from '@/config/errors';
import { RequestBodyError, sendError } from '@/lib/errors';
import { generateId } from '@/lib/id';
import { getRequestBody, verifyUserBody } from '@/lib/request';
import { ControllerType } from '@/types';
import { getDBUsers } from './getDBUsers';
import { setDBUsers } from './setDBUsers';

const postUser: ControllerType = async (request, response) => {
  try {
    const requestBody = await getRequestBody(request);
    const verifiedUserData = verifyUserBody(requestBody);

    if (verifiedUserData) {
      const users = await getDBUsers();

      const alreadyExistUsersIds = users.map(({ id }) => id);
      const id = generateId(alreadyExistUsersIds);

      const newUser = { id, ...verifiedUserData };

      await setDBUsers([...users, newUser]);

      response.setHeader('Content-Type', 'application/json');
      response.writeHead(201);
      response.end(JSON.stringify(newUser, null, 2));
    } else throw new RequestBodyError();
  } catch (error) {
    if (error instanceof RequestBodyError) {
      sendError(response, ERRORS.INVALID_USER_BODY);
    } else {
      sendError(response, ERRORS.INTERNAL_SERVER_ERROR);
    }
  }
};

export default postUser;
