const db = require('./../../server/models/userModel');
const request = require('supertest');
const controller = require('./../../server/controllers/userController.js');

jest.mock(db);
jest.mock(controller);

const mockedController = mocked(controller);
const mockedDb = mocked(db);

const MOCK_createUserReq = {
  username: 'mock',
  password: 'mock',
};

const MOCK_response = {
  username: 'mock',
};

//
describe('db user tests', () => {
  afterAll(() => {
    jest.resetAllMocks();
  });
  describe('CRUD tests', () => {
    it('returns all users', async () => {
      const req = {
        query: jest.fn().mockResolvedValueOnce('data'),
      };
      mockedDb.mockReturnValueOnce(req);
      await request(controller)
        .get('/user')
        .expect(200)
        .expect(res.body.toEqual('data'));
    });

    it('makes a new user', async () => {
      const newUser = await request(app)
        .post('/user/signup')
        .send(MOCK_createUserReq);
    });
  });
});

// describe('query tests', () => {
//   describe('Database Query', () => {
//     it('queries the database', async () => {
//       const res = await request(app).get(db);
//       expect(db.status).toBe(200);
//     });
//   });
// });
