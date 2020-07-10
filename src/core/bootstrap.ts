// eslint-disable-next-line no-unused-vars
import express, { Request, Response, NextFunction } from 'express';
import { config } from 'dotenv';
import { createConnectionFactoty } from '../database';
import { Logger } from '@logger';
import { routes } from './routes';

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
    routes.map(route => {
      const { middlewares } = route;
      this.app[route.method](route.path, [
        (middlewares !== undefined
          ? middlewares.map(middleware => (req: Request, res: Response, next: NextFunction) => {
            middleware(req, res, next);
          })
          : (req: Request, res: Response, next: NextFunction) => next()),
        (req: Request, res: Response) => {
          route.action(req, res);
        }]);
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
