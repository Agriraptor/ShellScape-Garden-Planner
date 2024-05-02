const db = require('./server/models/userModel');
const request = require('supertest');
const app = require('./server/server.js');

const MOCK_createUserReq = {
  username: 'mock',
  password: 'mock',
};

const MOCK_response = {
  username: 'mock',
};

describe('db tests', () => {
  describe('Create User', () => {
    it('returns all users', async () => {
      const res = await request(app).get('/user');
      expect(response.status).toBe(200);
    });
  });
});

describe
describe('query tests', () => {
  describe('Database Query', () => {
    it('queries the database', async () => {
      const res = await request(app).req(db);
      expect(db.status).toBe(200);
    });
  });
});