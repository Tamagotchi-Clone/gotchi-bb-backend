const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

jest.mock('../lib/utils/github');

describe('pet_scores routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('creates the scores', async () => {
    const agent = request.agent(app);

    const expected = {
      userId: '1',
      hunger: 0,
      play: 0,
      cleanliness: 0,
    };
    await agent.get('/api/v1/users/login/callback?code=42').redirects(1);
    const res = await agent.post('/api/v1/pet_scores').send(expected);
    expect(res.body).toEqual({
      id: expect.any(String),
      userId: expect.any(String),
      ...expected,
    });
  });
});
