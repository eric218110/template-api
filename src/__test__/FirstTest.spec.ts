import { UserModel } from '../source/models/User';

test('It should be ok !', () => {
  const userModel = new UserModel();

  userModel.name = 'Eric Silva';

  expect(userModel.name).toEqual('Eric Silva');
});
