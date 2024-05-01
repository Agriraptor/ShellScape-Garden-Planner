const db = require('./../../server/models/userModel');
const request = require('supertest');
const app = require('./../../server/server.js');

const MOCK_createUserReq = {
  username: 'mock',
  password: 'mock',
};

const MOCK_response = {
  username: 'mock',
};

describe('db user tests', () => {
  describe('CRUD tests', () => {
    it('returns all users', async () => {
      const res = await request(app).get('/user');
      expect(res.status).toBe(200);
    });

    it('makes a new user', async () => {
      const newUser = await request(app)
        .post('/user/signup')
        .send(MOCK_createUserReq);
    });
  });
});
