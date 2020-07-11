/* eslint-disable no-unused-vars */
import { HTTP_METHODS } from 'src/constants/http.enum';
import { Middleware } from './middleware';

export interface RouteDefinition{
    path: string;
    method: HTTP_METHODS;
    methodName: string;
    middlewares?: Array<Middleware>
}
