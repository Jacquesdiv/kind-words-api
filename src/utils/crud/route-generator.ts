import express, { Request, Response, Router } from 'express';

import { Services } from '../../services/services';
import { CrudService } from '../../services/crud/crud.service';
import { CrudRoute, defaultRoutes, Route } from './routes';
import { IBaseModel } from '../../database/models/base-model';

export const GenerateCrudRoutes = (
  service: () => CrudService<IBaseModel>,
  routes: Route[] = defaultRoutes
): Router => {

  const http = Services.instance().http;
  const router = express.Router();

  for (const route of routes) {
    switch (route.route) {
      case CrudRoute.GET_ALL:
        router.get('/', (req: Request, res: Response) => {
          http.json(service().findAll(), res);
        });
        break;

      case CrudRoute.GET_BY_ID:
        router.get('/:id', (req: Request, res: Response) => {
          http.json(service().findById(req.params.id), res);
        });
        break;

      case CrudRoute.CREATE:
        router.post('/', (req: Request, res: Response) => {
          http.json(service().create(req.body), res);
        });
        break;

      case CrudRoute.UPDATE:
        router.patch('/', (req: Request, res: Response) => {
          http.json(service().update(req.body), res);
        });
        break;

      case CrudRoute.DELETE:
        router.delete('/:id', (req: Request, res: Response) => {
          http.json(service().delete(req.params.id), res);
        });
        break;
    }
  }

  return router;
};
