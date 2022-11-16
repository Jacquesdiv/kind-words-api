import { Request, Response, NextFunction } from 'express';

export enum CrudRoute {
  GET_ALL,
  GET_BY_ID,
  CREATE,
  UPDATE,
  DELETE,
}

export type RequestHandler = ((req: Request, res: Response, next: NextFunction) => any);

export type Route = {
  path: string,
  route: CrudRoute,
};

export const defaultRoutes: Route[] = [
  {
    path: '',
    route: CrudRoute.GET_ALL
  },
  {
    path: '/:id',
    route: CrudRoute.GET_BY_ID
  },
  {
    path: '',
    route: CrudRoute.CREATE,
  },
  {
    path: '/:id',
    route: CrudRoute.UPDATE,
  },
  {
    path: '/:id',
    route: CrudRoute.DELETE,
  }
];
