import { usersRoutes } from './users';
import { ControllerType } from '@/types';

type RoutePathType = '/api/users';

type RouteMethodsType = 'GET' | 'POST' | 'PUT' | 'DELETE';

export type RouteType = {
  endpoint: RoutePathType;
  method: RouteMethodsType;
  endpointPathParts: number;
  controller: ControllerType;
};

const routes: RouteType[] = [...usersRoutes];

export default routes;
