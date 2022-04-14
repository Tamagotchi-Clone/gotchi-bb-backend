const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

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
      .send({ username: 'violet', password: 'gotchi is cool' });
    expect(res.body).toEqual({ id: expect.any(String), username: 'violet' });
  });
});
