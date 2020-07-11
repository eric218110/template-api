import { Bootstrap } from '../core/bootstrap';

try {
  // eslint-disable-next-line no-new
  new Bootstrap();
} catch (error) {
  throw new Error('Erro bootstrap application');
}
