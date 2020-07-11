
// eslint-disable-next-line no-unused-vars
import { Request, Response, NextFunction } from 'express';
import { Controller } from '../../common/decorators/class/controller';
import { Get } from 'src/common/decorators/class/methods/get';

@Controller('/user')
export class User {
  @Get({
    middlewares: [
      new User().mid,
      (request: Request, response: Response, next: NextFunction): void => {
        console.log('Midd 2');
        next();
      }]
  })
  async show (request: Request, response: Response) {
    response.json({ message: 'Hello word' });
  }

  mid (request: Request, response: Response, next: NextFunction): void {
    console.log('Midd 1');
    next();
  }

  @Get({ path: '/teste' })
  teste (request: Request, response: Response) {
    response.json({ message: 'Hello teste' });
  }
}
