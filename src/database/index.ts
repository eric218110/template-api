import {
  // eslint-disable-next-line no-unused-vars
  createConnection as createConnectionTypeORM, Connection
} from 'typeorm';
import { config } from 'dotenv';
import { resolve } from 'path';

class ConnectionFactory {
    private instance: undefined | Connection;
    async createConnection ():Promise<Connection> {
      config();
      const {
        DATABASE_HOST,
        DATABASE_USER,
        DATABASE_PASS,
        DATABASE_NAME,
        DATABASE_PORT,
        MODE
      } = process.env;

      try {
        const connection = await createConnectionTypeORM({
          type: 'postgres',
          host: DATABASE_HOST,
          username: DATABASE_USER,
          password: DATABASE_PASS,
          database: DATABASE_NAME,
          port: Number(DATABASE_PORT),
          synchronize: (MODE === 'development'),
          migrationsRun: (MODE === 'development'),
          entities: [resolve(__dirname, '.', 'entitys', '*.entity{.ts,.js}')]
        });

        if (this.instance === undefined) {
          this.instance = connection;
        }

        return this.instance;
      } catch (error) {
        console.log('not Connected database - ' + error);
        throw new Error('Not connected database');
      }
    }
}

export const createConnectionFactoty = new ConnectionFactory().createConnection;
