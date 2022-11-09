import request from 'supertest';
import userRepository from '../app/services/users';
import app from '../app';
import { User } from '../app/models/user';
import { encrypt } from '../app/helpers/encrypt';
import userFactory from './factory/userFactory';

describe('users', () => {
  beforeEach(async () => {
    const user1 = await userFactory.attrs();
    const user2 = await userFactory.attrs();

    user1.password = await encrypt(user1.password);
    user2.password = await encrypt(user2.password);

    await userRepository.createMany([user1, user2]);
  });
  describe('/users POST', () => {
    it('create user', async (done: jest.DoneCallback) => {
      const user: User = await userFactory.attrs();
      request(app)
        .post('/users')
        .send({ name: user.name, lastName: user.lastName, password: user.password, email: user.email })
        .expect(201)
        .then(async () => {
          const newuser = await userRepository.findUser({ name: user.name });
          expect(newuser).not.toBeNull();
          done();
        });
    });
    it('should return error for email is already use', async (done: jest.DoneCallback) => {
      const user = await userFactory.attrs();
      console.log([user]);
      await userRepository.createMany([user]);
      request(app)
        .post('/users')
        .send({ name: user.name, lastName: user.lastName, password: user.password, email: user.email })
        .expect(409)
        .then(async (res: request.Response) => {
          const newuser = await userRepository.findAll();
          console.log('NEWUSER', newuser);
          expect(newuser).not.toBeNull();
          expect(res.body).toHaveProperty('message');
          expect(res.body).toHaveProperty('internal_code');
          done();
        });
    });
    it("should return error for password the password doesn't meet the requirements", async (done: jest.DoneCallback) => {
      const user: User = await userFactory.attrs();
      user.password = 'asd1';
      request(app)
        .post('/users')
        .send({ name: user.name, lastName: user.lastName, password: user.password, email: user.email })
        .expect(400)
        .then((res: request.Response) => {
          expect(res.body).toHaveProperty('message');
          expect(res.body).toHaveProperty('internal_code');
          done();
        });
    });
    it('should return error for not send any parameter required', async (done: jest.DoneCallback) => {
      const user: User = await userFactory.attrs();
      user.password = 'asd1';
      request(app)
        .post('/users')
        .send()
        .expect(400)
        .then((res: request.Response) => {
          expect(res.body).toHaveProperty('message');
          expect(res.body).toHaveProperty('internal_code');
          done();
        });
    });
  });
});
