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
    const user = {
      username: 'harold',
      password: 'haroldiscool',
    };
    await agent.post('/api/v1/users').send(user);
    await agent.post('/api/v1/users/sessions').send(user);
    const res = await agent.post('/api/v1/pets').send(expected);
    expect(res.body).toEqual({ id: expect.any(String), ...expected });
  });

  it('gets all pets', async () => {
    const agent = request.agent(app);
    const expected = [
      {
        id: '1',
        species: 'Chicky',
        image: 'https://i.postimg.cc/1f3txb9Q/pet1.png',
      },
      {
        id: '2',
        species: 'Seahorse',
        image: 'https://i.postimg.cc/21qSyvb9/pet2.png',
      },
      {
        id: '3',
        species: 'Dino',
        image: 'https://i.postimg.cc/bGkYHhRQ/pet3.png',
      },
      {
        id: '4',
        species: 'lil guy',
        image: 'https://i.postimg.cc/QFRxTtc8/pet4.png',
      },
      {
        id: '5',
        species: 'Snail',
        image: 'https://i.postimg.cc/N9tsdzNZ/pet5.png',
      },
      {
        id: '6',
        species: 'Doggo',
        image: 'https://i.postimg.cc/cgcs2B2C/pet6.png',
      },
      {
        id: '7',
        species: 'Sheepy',
        image: 'https://i.postimg.cc/V0LY8bPR/pet7.png',
      },
      {
        id: '8',
        species: 'Turtle',
        image: 'https://i.postimg.cc/z30zkpTP/pet8.png',
      },
      {
        id: '9',
        species: 'Piggy',
        image: 'https://i.postimg.cc/jCsqNBn7/pet9.png',
      },
      {
        id: '10',
        species: 'Sleepy Cat',
        image: 'https://i.postimg.cc/XpqV1F8N/pet10.png',
      },
      {
        id: '11',
        species: 'Bunny',
        image: 'https://i.postimg.cc/9DqcChKv/pet11.png',
      },
      {
        id: '12',
        species: 'Giraffe',
        image: 'https://i.postimg.cc/xkDndZSq/pet12.png',
      },
    ];
    const res = await agent.get('/api/v1/pets/');
    expect(res.body).toEqual(expected);
  });

  it('gets pets by id', async () => {
    const agent = request.agent(app);
    const expected = {
      id: '1',
      species: 'Chicky',
      image: 'https://i.postimg.cc/1f3txb9Q/pet1.png',
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
      image: 'https://i.postimg.cc/21qSyvb9/pet2.png',
    });
  });

  it('deletes pet', async () => {
    const agent = request.agent(app);

    const expected = {
      id: '2',
      species: 'Seahorse',
      image: 'https://i.postimg.cc/21qSyvb9/pet2.png',
    };

    await agent.post('/api/v1/pets').send(expected);
    const res = await agent.delete(`/api/v1/pets/${expected.id}`);
    expect(res.body).toEqual(expected);
  });
});
