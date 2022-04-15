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
      .send({ username: 'vi', password: 'gotchiiscool' });
    expect(res.body).toEqual({ id: expect.any(String), username: 'vi' });
  });

  it('signs in an existing user', async () => {
    const user = await UserService.create({
      username: 'tom agatchi',
      password: 'gotchi',
    });
    const res = await request(app)
      .post('/api/v1/users/sessions')
      .send({ username: 'tom agatchi', password: 'gotchi' });
    expect(res.body).toEqual({
      message: 'You are signed in!',
      user: { ...user },
    });
  });

  it('signs out a user', async () => {
    await UserService.create({
      username: 'bob',
      password: 'bobguy',
    });
    await UserService.signIn({
      username: 'bob',
      password: 'bobguy',
    });
    const res = await request(app).delete('/api/v1/users/sessions');
    expect(res.body).toEqual({
      success: true,
      message: 'signed out',
    });
  });
});
