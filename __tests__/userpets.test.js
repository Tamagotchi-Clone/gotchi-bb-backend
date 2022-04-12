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

  it.only('creates a new pet in the userPet table', async () => {
    const agent = request.agent(app);

    const expected = {
      profile_id: '1',
      pet_id: '1',
      name: 'Omelette',
    };

    const res = await agent.post('/api/v1/userpets').send(expected);
    expect(res.body).toEqual({ id: expect.any(String), ...expected });
  });

  it('gets all pets', async () => {
    const agent = request.agent(app);

    const expected = {
      profile_id: '1',
      pet_id: '1',
      name: 'Omelette',
      hunger: 0,
      play: 0,
      cleanliness: 0,
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
      hunger: 0,
      play: 0,
      cleanliness: 0,
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
      hunger: 0,
      play: 0,
      cleanliness: 0,
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
      hunger: 0,
      play: 0,
      cleanliness: 0,
    });
  });

  it('it deletes a profile', async () => {
    const agent = request.agent(app);

    const expected = {
      id: '1',
      profile_id: '1',
      pet_id: '1',
      name: 'Omelette',
      hunger: 0,
      play: 0,
      cleanliness: 0,
    };

    await agent.post('/api/v1/userpets').send(expected);
    const res = await agent.delete(`/api/v1/userpets/${expected.id}`);
    expect(res.body).toEqual(expected);
  });
});
