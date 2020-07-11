/* eslint-disable no-unused-vars */
import 'reflect-metadata';
import express, { Request, Response, NextFunction, request } from 'express';
import { config } from 'dotenv';
import { createConnectionFactoty } from '../database';
import { Logger } from '@logger';
import { User } from '@controllers/User';
import { RouteDefinition } from 'src/common/decorators/class/routeDefinition';

export class Bootstrap {
  private app: express.Application;

  constructor () {
    this.app = express();
    this.connectionDatabase();
    this.routes();
    this.listen();
  }

  private connectionDatabase () {
    try {
      createConnectionFactoty()
        .then(() => Logger.success({ message: 'Database init', title: 'database' }))
        .catch(erro => {
          Logger.error({ title: 'database', message: erro });
        });
    } catch (error) {
      console.log(error);
      throw new Error('Not running server');
    }
  }

  routes () {
    [User].map(controller => {
      const instance = new User();
      const prefix = Reflect.getMetadata('prefix', controller);
      const routes: Array<RouteDefinition> = Reflect.getMetadata('routes', controller);

      routes.map(route => {
        const { middlewares, method, path } = route;

        this.app[route.method.toString()](prefix + route.path, [
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

  private async listen () {
    try {
      config();
      const port = process.env.SERVER_PORT || 1504;
      this.app.listen(port);
      Logger.success({ title: 'server', message: `Server running in port ${port}` });
    } catch (error) {
      console.log(error);
      throw new Error('Not running server');
    }
  }
}
