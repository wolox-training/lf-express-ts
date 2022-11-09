import { factory } from 'factory-girl';
import { User } from '../../app/models/user';

factory.define('User', User, {
  name: factory.chance('name'),
  lastName: factory.chance('last', { middle: true }),
  email: factory.sequence('User.email', (n: number) => `dummy-user-${n}@wolox.com`),
  password: 'pa55word'
});

export default {
  attrs: (): Promise<User> => factory.attrs('User')
};
