const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
//const User = require('../lib/models/User');
const UserService = require('../lib/services/UserService');

describe('gotchi-clone auth routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('signs a user up via POST', async () => {
    const res = await request(app)
      .post('/api/v1/users')
      .send({ username: 'violet', password: 'gotchiiscool' });
    expect(res.body).toEqual({ id: expect.any(String), username: 'violet' });
  });

  it('signs in an existing user', async () => {
    const user = await UserService.create({
      username: 'violet',
      password: 'gotchiiscool',
    });
    const res = await request(app)
      .post('/api/v1/users/sessions')
      .send({ username: 'violet', password: 'gotchiiscool' });
    expect(res.body).toEqual({ message: 'you are signed in!', user });
  });
});
