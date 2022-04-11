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
      hunger: 0,
      play: 0,
      cleanliness: 0,
    };

    const res = await agent.post('/api/v1/userpets').send(expected);
    expect(res.body).toEqual({ id: expect.any(String), ...expected });
  });
});
