import { getUsers, getUser, postUser, putUser, deleteUser } from '@/controllers/users';
import { RouteType } from '@/routes';

export const usersRoutes: RouteType[] = [
  {
    endpoint: '/api/users',
    method: 'GET',
    endpointPathParts: 2,
    controller: getUsers,
  },
  {
    endpoint: '/api/users',
    method: 'GET',
    endpointPathParts: 3,
    controller: getUser,
  },
  {
    endpoint: '/api/users',
    method: 'POST',
    endpointPathParts: 2,
    controller: postUser,
  },
  {
    endpoint: '/api/users',
    method: 'PUT',
    endpointPathParts: 3,
    controller: putUser,
  },
  {
    endpoint: '/api/users',
    method: 'DELETE',
    endpointPathParts: 3,
    controller: deleteUser,
  },
];
