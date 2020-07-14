/* eslint-disable no-unused-vars */
import 'reflect-metadata';
import express from 'express';
import { config } from 'dotenv';
import { createConnectionFactoty } from '../database';
import { Logger } from '@logger';
import { Routers } from '../routes';

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
    Routers.registerRoutes(this.app);
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
