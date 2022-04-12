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

  it('creates a new pet in the userPet table', async () => {
    const agent = request.agent(app);

    const expected = {
      profile_id: '1',
      pet_id: '1',
      name: 'Omelette',
      hunger: null,
      play: null,
      cleanliness: null,
    };
    await agent.get('/api/v1/users/login/callback?code=42').redirects(1);
    const res = await agent.post('/api/v1/userpets').send(expected);
    expect(res.body).toEqual({ id: expect.any(String), ...expected });
  });

  it('gets all pets', async () => {
    const agent = request.agent(app);

    const expected = {
      profile_id: '1',
      pet_id: '1',
      name: 'Omelette',
      hunger: null,
      play: null,
      cleanliness: null,
    };

    await agent.post('/api/v1/userpets').send(expected);
    const res = await agent.get('/api/v1/userpets');
    expect(res.body).toEqual([{ id: expect.any(String), ...expected }]);
  });

  it('gets pet by id', async () => {
    const agent = request.agent(app);

    const expected = {
      id: '1',
      profile_id: '1',
      pet_id: '1',
      name: 'Omelette',
      hunger: null,
      play: null,
      cleanliness: null,
    };

    await agent.post('/api/v1/userpets').send(expected);

    const res = await agent.get(`/api/v1/userpets/${expected.id}`);
    expect(res.body).toEqual({ id: expect.any(String), ...expected });
  });

  it('it updates pet by id', async () => {
    const agent = request.agent(app);

    const expected = {
      id: '1',
      profile_id: '1',
      pet_id: '1',
      name: 'Omelette',
      hunger: null,
      play: null,
      cleanliness: null,
    };

    await agent.post('/api/v1/userpets').send(expected);
    const res = await agent
      .patch(`/api/v1/userpets/${expected.id}`)
      .send({ name: 'egg' });
    expect(res.body).toEqual({
      id: '1',
      profile_id: '1',
      pet_id: '1',
      name: 'egg',
      hunger: null,
      play: null,
      cleanliness: null,
    });
  });

  it('it deletes a profile', async () => {
    const agent = request.agent(app);

    const expected = {
      id: '1',
      profile_id: '1',
      pet_id: '1',
      name: 'Omelette',
      hunger: null,
      play: null,
      cleanliness: null,
    };

    await agent.post('/api/v1/userpets').send(expected);
    const res = await agent.delete(`/api/v1/userpets/${expected.id}`);
    expect(res.body).toEqual(expected);
  });
});
