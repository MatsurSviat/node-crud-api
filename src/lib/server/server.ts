import http, { IncomingMessage, ServerResponse } from 'http';
import { logRequest } from '@/lib/request-logger';
import { printColorMessage } from '@/lib/colors';
import { getEndpointController, getRequestData } from '@/lib/request';
import { sendError } from '@/lib/errors';
import { ERRORS } from '@/config/errors';
import routes from '@/routes';

export const createServer = () =>
  http.createServer((request: IncomingMessage, response: ServerResponse) =>
    requestListener(request, response)
  );

export const requestListener = (request: IncomingMessage, response: ServerResponse) => {
  logRequest(request);

  const { method, pathname } = getRequestData(request);
  const requestController = getEndpointController(pathname, method, routes);

  if (!requestController) {
    sendError(response, ERRORS.NO_ENDPOINT);
  } else {
    requestController(request, response);
  }
};

export const printStartMessage = (PORT: number) => {
  printColorMessage({ color: 'yellow', message: `Server is running on port ${PORT}` });
};

export const printStartMessageChild = (PORT: number) => {
  printColorMessage({ color: 'yellow', message: `Child server is running on port ${PORT}` });
};
