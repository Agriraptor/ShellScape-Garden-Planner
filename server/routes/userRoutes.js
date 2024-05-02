const express = require('express');
const userController = require('../controllers/userController');

const userRouter = express.Router();

// EXPECT THE FOLLOWING FOR SIGNUP LOGIN
// Route for user signup
userRouter.post('/signup', userController.createUser, (req, res) => {
  // If user creation successful, return 201 status
  if (res.locals.userCreated) res.status(201).json(res.locals.userCreated);
  // otherwise, return 417 status
  else res.status(417).json(res.locals.userCreated);
});

// Route for user login
userRouter.post('/login', userController.loginUser, (req, res) => {
  // Check if username and password exist in the database
  if (res.locals.user) res.status(200).json(res.locals.user);
  // if not, return 417 status
  else res.status(417).json(res.locals.user);
});

// Route to retrieve all users and passwords
userRouter.get('/', userController.showTable, (req, res) => {
  res.status(200).json(res.locals.data);
});

module.exports = userRouter;
