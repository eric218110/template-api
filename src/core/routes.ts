// eslint-disable-next-line no-unused-vars
import { Request, Response, NextFunction } from 'express';
import { HTTP_METHODS } from 'src/constants/http.enum';

interface IRoutes{
    method: HTTP_METHODS;
    path: string;
    action: Function;
    middlewares?: Array<Function>;
}

class Routes {
    private routes: IRoutes[] = [];

    constructor () {
      this.routes.push({ action: this.initialRouter, path: '/', method: HTTP_METHODS.GET, middlewares: [this.initialMiddleware, this.initialMiddleware2, this.initialMiddleware3] });
      this.routes.push({ action: this.initialRouter, path: '/', method: HTTP_METHODS.PUT });
    }

    private async initialRouter (request: Request, response: Response) {
      response.json({ message: 'Hello word' });
    }

    private async initialMiddleware (request: Request, response: Response, next: NextFunction) {
      console.log({ message: 'Middleware 1' });
      next();
    }

    private async initialMiddleware2 (request: Request, response: Response, next: NextFunction) {
      console.log({ message: 'Middleware 2' });
      next();
    }

    private async initialMiddleware3 (request: Request, response: Response, next: NextFunction) {
      console.log({ message: 'Middleware 3' });
      next();
    }

    init (): IRoutes[] {
      return this.routes;
    }
}

export const routes = new Routes().init();
