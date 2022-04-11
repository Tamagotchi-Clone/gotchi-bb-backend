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
      name: 'Ianmami@example.com',
    };
    //   let res = await agent.post('/api/v1/profiles').send(expected);
    //   expect(res.status).toEqual(401);

    //   await agent.get('/api/v1/users/login/callback?code=42').redirects(1);

    const res = await agent.post('/api/v1/profiles').send(expected);
    expect(res.body).toEqual(expected);
  });

  it('gets a list of all profiles', async () => {
    const agent = request.agent(app);
    const expected = {
      user_id: '1',
      name: 'Ianmami@example.com',
    };

    await agent.post('/api/v1/profiles').send(expected);
    const res = await agent.get('/api/v1/profiles');
    expect(res.body).toEqual([{ id: expect.any(String), ...expected }]);
  });

  it('get profile by id', async () => {
    const agent = request.agent(app);
    const expected = {
      id: '1',
      user_id: '1',
      name: 'Ianmami@example.com',
    };
    await agent.post('/api/v1/profiles').send(expected);
    const res = await agent.get(`/api/v1/profiles/${expected.id}`);
    expect(res.body).toEqual({ id: expect.any(String), ...expected });
  });

  it('updates profile by id', async () => {
    const agent = request.agent(app);
    const expected = {
      id: '1',
      user_id: '1',
      name: 'Ianmami@example.com',
    };
    await agent.post('/api/v1/profiles').send(expected);
    const res = await agent
      .patch('/api/v1/profiles/1')
      .send({ name: 'violet' });
    expect(res.body).toEqual({ id: '1', user_id: '1', name: 'violet' });
  });

  it('deletes a profile', async () => {
    const agent = request.agent(app);
    const expected = {
      id: '1',
      user_id: '1',
      name: 'Ianmami@example.com',
    };
    await agent.post('/api/v1/profiles').send(expected);
    const res = await agent.delete(`/api/v1/profiles/${expected.id}`);
    expect(res.body).toEqual(expected);
  });
});
