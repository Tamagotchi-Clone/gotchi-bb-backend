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
});
