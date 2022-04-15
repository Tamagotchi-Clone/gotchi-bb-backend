const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

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
    const user = {
      username: 'harold',
      password: 'haroldiscool',
    };
    await agent.post('/api/v1/users').send(user);
    await agent.post('/api/v1/users/sessions').send(user);
    const res = await agent.post('/api/v1/userpets').send(expected);
    expect(res.body).toEqual({ id: expect.any(String), ...expected });
  });

  it('gets all pets', async () => {
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
    const user = {
      username: 'harold',
      password: 'haroldiscool',
    };
    await agent.post('/api/v1/users').send(user);
    await agent.post('/api/v1/users/sessions').send(user);
    await agent.post('/api/v1/userpets').send(expected);
    const res = await agent.get('/api/v1/userpets');
    expect(res.body).toEqual([
      {
        cleanliness: expect.any(String),
        hunger: expect.any(String),
        id: '1',
        name: 'omelette',
        petId: '1',
        play: expect.any(String),
        userId: '1',
      },
      { id: expect.any(String), ...expected },
    ]);
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
      cleanliness: expect.any(String),
    };
    const user = {
      username: 'harold',
      password: 'haroldiscool',
    };
    await agent.post('/api/v1/users').send(user);
    await agent.post('/api/v1/users/sessions').send(user);
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
    const user = {
      username: 'harold',
      password: 'haroldiscool',
    };
    await agent.post('/api/v1/users').send(user);
    await agent.post('/api/v1/users/sessions').send(user);
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
    const user = {
      username: 'harold',
      password: 'haroldiscool',
    };
    await agent.post('/api/v1/users').send(user);
    await agent.post('/api/v1/users/sessions').send(user);
    await agent.post('/api/v1/userpets').send(expected);
    const res = await agent.delete(`/api/v1/userpets/${expected.id}`);
    expect(res.body).toEqual(expected);
  });

  it('it updates hunger by id', async () => {
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

    const user = {
      username: 'harold',
      password: 'haroldiscool',
    };
    await agent.post('/api/v1/users').send(user);
    await agent.post('/api/v1/users/sessions').send(user);
    await agent.post('/api/v1/userpets').send(expected);

    const res = await agent
      .patch(`/api/v1/userpets/${expected.id}/hunger`)
      .send(expected.id);
    expect(res.body).toEqual({
      id: '2',
      userId: '1',
      petId: '1',
      name: 'Omelette',
      hunger: expect.any(String),
      play: expect.any(String),
      cleanliness: expect.any(String),
    });
  });

  it('it updates play by id', async () => {
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

    const user = {
      username: 'harold',
      password: 'haroldiscool',
    };
    await agent.post('/api/v1/users').send(user);
    await agent.post('/api/v1/users/sessions').send(user);
    await agent.post('/api/v1/userpets').send(expected);

    const res = await agent
      .patch(`/api/v1/userpets/${expected.id}/play`)
      .send(expected.id);
    expect(res.body).toEqual({
      id: '2',
      userId: '1',
      petId: '1',
      name: 'Omelette',
      hunger: expect.any(String),
      play: expect.any(String),
      cleanliness: expect.any(String),
    });
  });

  it('it updates cleanliness by id', async () => {
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

    const user = {
      username: 'harold',
      password: 'haroldiscool',
    };
    await agent.post('/api/v1/users').send(user);
    await agent.post('/api/v1/users/sessions').send(user);

    await agent.post('/api/v1/userpets').send(expected);

    const res = await agent
      .patch(`/api/v1/userpets/${expected.id}/clean`)
      .send(expected.id);
    expect(res.body).toEqual({
      id: '2',
      userId: '1',
      petId: '1',
      name: 'Omelette',
      hunger: expect.any(String),
      play: expect.any(String),
      cleanliness: expect.any(String),
    });
  });
});
