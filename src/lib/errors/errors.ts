import { ServerResponse } from 'http';

export class RequestBodyError extends Error {}

export const sendError = (
  response: ServerResponse,
  { code, message }: { code: number; message: string }
) => {
  const error = {
    code,
    message,
  };

  response.setHeader('Content-Type', 'application/json');
  response.writeHead(code);
  response.end(JSON.stringify(error, null, 2));
};
