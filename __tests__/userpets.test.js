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
      id: '2',
      userId: '1',
      petId: '1',
      name: 'Omelette',
      hunger: expect.any(String),
      play: expect.any(String),
      cleanliness: expect.any(String),
    };

    const res = await agent.post('/api/v1/userpets').send(expected);
    expect(res.body).toEqual({ id: expect.any(String), ...expected });
  });

  it.skip('gets all pets', async () => {
    const agent = request.agent(app);

    const expected = {
      id: '2',
      userId: '1',
      petId: '1',
      name: 'Omelette',
      hunger: expect.any(String),
      play: expect.any(String),
      cleanliness: expect.any(String),
    };

    await agent.post('/api/v1/userpets').send(expected);
    const res = await agent.get('/api/v1/userpets');
    expect(res.body).toEqual([{ id: expect.any(String), ...expected }]);
  });

  it('gets pet by id', async () => {
    const agent = request.agent(app);

    const expected = {
      id: '2',
      userId: '1',
      petId: '1',
      name: 'Omelette',
      hunger: expect.any(String),
      play: expect.any(String),
      cleanliness: '2022-04-13T22:16:10.633Z',
    };

    await agent.post('/api/v1/userpets').send(expected);

    const res = await agent.get(`/api/v1/userpets/${expected.id}`);
    expect(res.body).toEqual({ id: expect.any(String), ...expected });
  });

  it('it updates pet by id', async () => {
    const agent = request.agent(app);

    const expected = {
      id: '2',
      userId: '1',
      petId: '1',
      name: 'Omelette',
      hunger: expect.any(String),
      play: expect.any(String),
      cleanliness: expect.any(String),
    };

    await agent.post('/api/v1/userpets').send(expected);
    const res = await agent
      .patch(`/api/v1/userpets/${expected.id}`)
      .send({ name: 'egg' });
    expect(res.body).toEqual({
      id: '2',
      userId: '1',
      petId: '1',
      name: 'egg',
      hunger: expect.any(String),
      play: expect.any(String),
      cleanliness: expect.any(String),
    });
  });

  it('it deletes a profile', async () => {
    const agent = request.agent(app);

    const expected = {
      id: '2',
      userId: '1',
      petId: '1',
      name: 'Omelette',
      hunger: expect.any(String),
      play: expect.any(String),
      cleanliness: expect.any(String),
    };

    await agent.post('/api/v1/userpets').send(expected);
    const res = await agent.delete(`/api/v1/userpets/${expected.id}`);
    expect(res.body).toEqual(expected);
  });

  it.only('it updates pet by id', async () => {
    const agent = request.agent(app);

    const expected = {
      id: '2',
      userId: '1',
      petId: '1',
      name: 'Omelette',
      hunger: expect.any(String),
      play: expect.any(String),
      cleanliness: expect.any(String),
    };

    await agent.get('/api/v1/users/login/callback?code=42').redirects(1);

    await agent.post('/api/v1/userpets').send(expected);
    const res = await agent
      .patch(`/api/v1/userpets/${expected.id}/hunger`)
      .send(expected.id);
    expect(res.body).toEqual({
      id: '2',
      userId: '1',
      petId: '1',
      name: 'Omelette',
      hunger: '2022-04-13T05:08:26.812Z',
      play: expect.any(String),
      cleanliness: expect.any(String),
    });
  });
});
