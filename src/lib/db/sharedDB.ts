import { createServer } from 'http';
import DB from './db';
import { getRequestBody } from '../request';
import { printColorMessage } from '../colors';

const sharedDB = new DB();

export const createSharedDBServer = () =>
  createServer(async (request, response) => {
    const { method } = request;

    if (method === 'GET') {
      const users = sharedDB.getUsers();
      response.end(JSON.stringify(users));
      return;
    }

    if (method === 'POST') {
      const requestBody = await getRequestBody(request);
      sharedDB.setUsers(requestBody);
      response.end();
      return;
    }

    response.end(null);
  });

export const printStartMessageDB = (PORT: number) => {
  printColorMessage({ color: 'yellow', message: `DBServer is running on port ${PORT}` });
};
