/* eslint-disable no-unused-vars */
import { resolve } from 'path';
import { Application, Request, Response, NextFunction } from 'express';
import { RouteDefinition } from 'src/common/decorators/class/routeDefinition';
import { Logger } from '@logger';
import { User } from '@controllers/User';
import { Message } from '@controllers/Message';

export class Routers {
  private static routes = [];

  static setRoutes () {
    this.routes.push(User);
    this.routes.push(Message);
  }

  static registerRoutes (app: Application) {
    this.setRoutes();
    this.routes.map(Controller => {
      const instance = new Controller();
      const prefix = Reflect.getMetadata('prefix', Controller);
      const routes: Array<RouteDefinition> = Reflect.getMetadata('routes', Controller);

      routes.map(route => {
        const { middlewares, method, path } = route;

        app[route.method.toString()](prefix + route.path, [
          (middlewares !== undefined)
            ? middlewares.map(middleware => (request: Request, response: Response, next: NextFunction) => {
              middleware(request, response, next);
            })
            : (request: Request, response: Response, next: NextFunction) => next(),
          (request: Request, response: Response) => {
            instance[route.methodName](request, response);
          }
        ]);
        Logger.info({ title: 'routes', message: `[ "${prefix + path}" => ${method.toUpperCase()} ]` });
      });
    });
  }
}
