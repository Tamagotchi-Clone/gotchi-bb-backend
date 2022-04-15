const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('scores routes', () => {
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
    const user = {
      username: 'harold',
      password: 'haroldiscool',
    };
    await agent.post('/api/v1/users').send(user);
    await agent.post('/api/v1/users/sessions').send(user);
    const res = await agent.post('/api/v1/scores').send(expected);
    expect(res.body).toEqual({
      id: expect.any(String),
      userId: expect.any(String),
      ...expected,
    });
  });

  it('gets the pet scores', async () => {
    const agent = request.agent(app);
    const expected = {
      user: 'violet',
      pet: 'omelette',
      cleaned: 1,
      played: 1,
      fed: 1,
      happiness: '3',
    };
    const res = await agent.get('/api/v1/scores');
    expect(res.body[0]).toEqual(expected);
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
    const res = await agent.get(`/api/v1/scores/${expected.id}`);
    expect(res.body).toEqual(expected);
  });

  it('updates a score', async () => {
    const agent = request.agent(app);
    const expected = {
      id: '1',
      userId: '1',
      hunger: 1,
      play: 1,
      cleanliness: 1,
    };
    await agent.post('/api.v1.scores').send(expected);
    const res = await agent
      .patch(`/api/v1/scores/${expected.id}`)
      .send({ hunger: 2 });
    expect(res.body).toEqual({
      id: expect.any(String),
      userId: '1',
      hunger: 2,
      play: 1,
      cleanliness: 1,
    });
  });
});
