import { createServer, request as httpRequest } from 'http';
import { getRequestBody } from '../request';
import { printColorMessage } from '../colors';
import { sendError } from '../errors';
import { ERRORS } from '@/config/errors';

export const balancer = (PORT: number, children: number) =>
  createServer(async (request, response) => {
    try {
      let count = 1;

      const body = await getRequestBody(request);
      const { url, method } = request;

      const requestToChildParams = {
        headers: {
          'Content-Type': 'application/json',
        },
        port: Number(PORT) + count,
        path: url,
        method: method,
      };

      const requestToChild = httpRequest(requestToChildParams, async (childResponse) => {
        const { statusCode } = childResponse;
        const childBody = await getRequestBody(childResponse);

        response.writeHead(statusCode || 500, {
          'Content-Type': 'application/json',
        });

        response.write(JSON.stringify(childBody || ''));
        response.end();
      });

      requestToChild.on('error', (error) => {
        console.error(error);
      });

      requestToChild.write(JSON.stringify(body || ''));

      requestToChild.end();

      count = count + 1 > children ? 1 : count + 1;
    } catch (error) {
      sendError(response, ERRORS.INTERNAL_SERVER_ERROR);
    }
  });

export const printBalancerMessage = (PORT: number) => {
  printColorMessage({ color: 'green', message: `Balancer is running on port ${PORT}` });
};
