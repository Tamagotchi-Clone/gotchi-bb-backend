const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

jest.mock('../lib/utils/github');

describe('gotchi-clone routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('user can create a profile', async () => {
    const agent = request.agent(app);
    const expected = {
      id: expect.any(String),
      user_id: '1',
      username: 'Ianmami@example.com',
    };
    //   let res = await agent.post('/api/v1/profiles').send(expected);
    //   expect(res.status).toEqual(401);

    //   await agent.get('/api/v1/users/login/callback?code=42').redirects(1);

    const res = await agent.post('/api/v1/profiles').send(expected);
    expect(res.body).toEqual(expected);
  });
});
