// eslint-disable-next-line no-unused-vars
import { Response, Request, NextFunction } from 'express';

export class ControllerMetadata {
    actions: Array<(request: Request, response: Response) => {}>;
    target: Function;
    type: 'default'|'json';
    routing: string;
    middleware: Array<(request: Request, response: Response, next: NextFunction) => {}>
}
