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

jest.mock('./../../server/models/userModel');

// Test suite for userController
describe('userController tests', () => {
  xit('returns all users from the database', async () => {
    // Mocking request, response, and next function
    const req = mockReq;
    const res = {};
    const next = jest.fn();

    // Calling the showTable function of the controller
    const data = await controller.showTable(req, res, next);

    // Expecting res.locals.data to be called with the mock data
    expect(res.locals.userCreated).toBeCalledWith(false);
  });

  // Test suite for createUser function
  describe('createUser tests', () => {
    it('sets userCreated to false if username exists in the database', async () => {
      // Mocking request, response, and next function
      const req = mockReq;
      const res = { locals: {} };
      const next = jest.fn();
      const db = { query: jest.fn() };

      db.query.mockResolvedValue(mockDbResponse);

      // Calling the createUser function of the controller
      const data = await controller.createUser(req, res, next, db);

      // Expecting res.locals.data to be called with the mock data
      expect(next).toHaveBeenCalledWith();
      expect(res.locals.userCreated).toEqual(false);
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

    // it('sets userCreated to true if user is created', async () => {
    //   expect(userCreated.toEqual(true)); //?
    // });
  });
});
