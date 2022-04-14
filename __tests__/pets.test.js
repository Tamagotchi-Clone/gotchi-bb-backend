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

  it('creates a pet', async () => {
    const agent = request.agent(app);

    const expected = {
      species: 'Test pet',
      image: 'image.png',
    };
    await agent.get('/api/v1/users/login/callback?code=42').redirects(1);
    const res = await agent.post('/api/v1/pets').send(expected);
    expect(res.body).toEqual({ id: expect.any(String), ...expected });
  });

  it('gets all pets', async () => {
    const agent = request.agent(app);
    const expected = [
      {
        id: '1',
        species: 'Mametchi',
        image:
          'https://pbs.twimg.com/media/FP-gyhdaAAUvLLN?format=jpg&name=large',
      },
    ];
    const res = await agent.get('/api/v1/pets/');
    expect(res.body).toEqual(expected);
  });

  it('gets pets by id', async () => {
    const agent = request.agent(app);
    const expected = {
      id: '1',
      species: 'Mametchi',
      image:
        'https://pbs.twimg.com/media/FP-gyhdaAAUvLLN?format=jpg&name=large',
    };
    const res = await agent.get(`/api/v1/pets/${expected.id}`);
    expect(res.body).toEqual(expected);
  });

  it('updates pet', async () => {
    const agent = request.agent(app);

    const expected = {
      id: '2',
      species: 'Test pet',
      image: 'image.png',
    };

    await agent.post('/api/v1/pets').send(expected);
    const res = await agent
      .patch(`/api/v1/pets/${expected.id}`)
      .send({ species: 'test test' });
    expect(res.body).toEqual({
      id: expect.any(String),
      species: 'test test',
      image: 'image.png',
    });
  });

  it('deletes pet', async () => {
    const agent = request.agent(app);

    const expected = {
      id: '2',
      species: 'Test pet',
      image: 'image.png',
    };

    await agent.post('/api/v1/pets').send(expected);
    const res = await agent.delete(`/api/v1/pets/${expected.id}`);
    expect(res.body).toEqual(expected);
  });
});
