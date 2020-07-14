
// eslint-disable-next-line no-unused-vars
import { Request, Response, NextFunction } from 'express';
import { Controller } from '../../common/decorators/class/controller';
import { Get, Post } from 'src/common/decorators/class/methods';

@Controller('message')
export class Message {
  @Get()
  teste (request: Request, response: Response) {
    response.json({ message: 'Hello teste' });
  }

  @Post({ path: '/post' })
  post (request: Request, response: Response) {
    response.json({ message: 'Method Post' });
  }
}
