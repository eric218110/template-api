/* eslint-disable no-unused-vars */
import { RouteDefinition } from '../routeDefinition';
import { HTTP_METHODS } from 'src/constants/http.enum';
import { Middleware } from '../middleware';

export const Get = (props?: {path?: string, middlewares?: Array<Middleware>}): MethodDecorator => {
  return (target, propertyKey: string): void => {
    let path: string;
    let middlewares: Array<Middleware> | undefined;
    if (!Reflect.hasMetadata('routes', target.constructor)) {
      Reflect.defineMetadata('routes', [], target.constructor);
    }

    const routes = Reflect.getMetadata('routes', target.constructor) as Array<RouteDefinition>;
    if (props === undefined) {
      path = '';
      middlewares = undefined;
    } else {
      path = props.path !== undefined ? props.path : '';
    }
    routes.push({
      method: HTTP_METHODS.GET,
      methodName: propertyKey,
      path,
      middlewares
    });
  };
};
