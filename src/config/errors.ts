export const ERRORS = {
  NO_ENDPOINT: {
    code: 404,
    message: 'Oops! Endpoint does not exist!',
  },
  INVALID_USER_ID: {
    code: 400,
    message: '{userId} is invalid (not uuid)!',
  },
  USER_NOT_EXIST: {
    code: 404,
    message: 'User does not exist!',
  },
  INVALID_USER_BODY: {
    code: 400,
    message: 'Request body does not contain required fields',
  },
  INTERNAL_SERVER_ERROR: {
    code: 500,
    message: 'Internal Server Error!',
  },
};
