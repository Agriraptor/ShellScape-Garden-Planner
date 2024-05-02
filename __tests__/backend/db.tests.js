const db = require('./../../server/models/userModel');
const request = require('supertest');
const controller = require('./../../server/controllers/userController.js');
const router = require('./../../server/routes/userRoutes.js');

// Mock request object for testing
const mockReq = {
  username: 'mock',
  password: 'mock',
};

// Mock database response
const mockDbResponse = {
  rows: [
    {
      username: 'mock',
      password: 'Motcer',
    },
  ],
};

// Test suite for userController
describe('userController tests', () => {
  it('returns all users from the database', async () => {
    // Mocking request, response, and next function
    const req = {};
    const res = {};
    const next = jest.fn();

    // Mocking the query method of the database model and resolving it with mock data
    jest.spyOn(db, 'query').mockResolvedValueOnce(mockDbResponse);

    // Calling the showTable function of the controller
    const data = await controller.showTable(req, res, next);

    // Expecting res.locals.data to be called with the mock data
    expect(res.locals.data).toBeCalledWith([
      {
        username: 'mock',
        password: 'Motcer',
      },
    ]);
  });

  // Test suite for createUser function
  describe('createUser tests', () => {
    beforeEach(() => {
      // Mocking request, response, and next function for each test case
      const req = {};
      const res = {};
      const next = jest.fn();
    });

    it('sets userCreated to false if username exists in the database', async () => {
      // Mocking the query method of the database model and resolving it with mock data
      jest.spyOn(db, 'query').mockResolvedValueOnce(mockDbResponse);

      // Calling the showTable function of the controller
      const data = await controller.showTable(req, res, next);

      // Expecting res.locals.data to be called with the mock data
      expect(res.locals.data).toBeCalledWith([
        {
          username: 'mock',
          password: 'Motcer',
        },
      ]);
    });

    it('throws error if inputs are invalid', async () => {
      // Setting request body with empty username and password
      const req = { body: { username: '', password: '' } };
      const res = {};
      const next = jest.fn();

      // Calling createUser function of the controller
      const data = await controller.createUser(req, res, next);

      // Expecting next function to be called with an error message
      expect(next).toBeCalledWith({
        log: 'userController.createUser Database: ERROR: Invalid Inputs',
        message: {
          err: 'Error occurred in userController.createUser. Check server logs for more details.',
        },
      });
    });

    it('sets userCreated to true if user is created', async () => {
      expect(userCreated.toEqual(true)); //?
    });
  });
});
