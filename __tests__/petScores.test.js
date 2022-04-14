const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

jest.mock('../lib/utils/github');

describe('petScores routes', () => {
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
    const res = await agent.post('/api/v1/petScores').send(expected);
    expect(res.body).toEqual({
      id: expect.any(String),
      userId: expect.any(String),
      ...expected,
    });
  });

  it('gets the pet scores', async () => {
    const agent = request.agent(app);
    const expected = [
      {
        id: '1',
        userId: '1',
        hunger: 1,
        play: 1,
        cleanliness: 1,
      },
    ];
    const res = await agent.get('/api/v1/petScores');
    expect(res.body).toEqual(expected);
  });

  it('gets the scores by id', async () => {
    const agent = request.agent(app);
    const expected = {
      id: '1',
      userId: '1',
      hunger: 1,
      play: 1,
      cleanliness: 1,
    };
    const res = await agent.get(`/api/v1/petScores/${expected.id}`);
    expect(res.body).toEqual(expected);
  });
});
