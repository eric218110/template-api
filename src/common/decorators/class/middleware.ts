// eslint-disable-next-line no-unused-vars
import { Request, Response, NextFunction } from 'express';

export type Middleware = (equest: Request, response: Response, next: NextFunction) => void
