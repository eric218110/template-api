import express from 'express';
import { User } from '@controllers/User';

const app = express();

app.get('/', (request, response) => {
  // eslint-disable-next-line no-new
  new User();
  return response.json({ message: 'Hello World' });
});

app.listen(1995);
