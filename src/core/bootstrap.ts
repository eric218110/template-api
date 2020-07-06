import express from 'express';
import { config } from 'dotenv';
import { createConnectionFactoty } from '../database';
import { Logger } from '@logger';

export class Bootstrap {
  static async init () {
    try {
      config();
      const port = process.env.SERVER_PORT || 1504;
      const app = express();
      // CREATE CONNECTION WITH TYPEORM
      createConnectionFactoty()
        .then(() => Logger.success({ message: 'Database init', title: 'database' }))
        .catch(erro => {
          Logger.error({ title: 'database', message: erro });
        });

      // ROUTES APPLICATION
      app.get('/', async (request, response) => {
        response.json({ message: 'Hello word' });
      });

      // LISTEN PORT SERVER
      app.listen(port);
      Logger.success({ title: 'SERVER', message: `Server running in port ${port}` });
    } catch (error) {
      console.log(error);
      throw new Error('Not running server');
    }
  }
}
