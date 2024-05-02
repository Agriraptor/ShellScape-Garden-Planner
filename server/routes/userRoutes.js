const express = require('express');
const userController = require('../controllers/userController');

const userRouter = express.Router();

// EXPECT THE FOLLOWING FOR SIGNUP LOGIN
// baseurl.com/user/signup
// { username: 'username', password: 'password' }
userRouter.post('/signup', userController.createUser, (req, res) => {
  //if user was created successfully return 200 status else have frontend redirect
  if (res.locals.userCreated) res.status(201).json(res.locals.userCreated);
  else res.status(417).json(res.locals.userCreated);
});

//add a route for login
// baseurl.com/user/login
userRouter.post('/login', userController.loginUser, (req, res) => {
  //check if username and password exist on db if not return to sign up page
  if (res.locals.user) res.status(200).json(res.locals.user);
  else res.status(417).json(res.locals.user);
});

//update password
//userRouter.put('/', userControllers.updatePassword);

//grab all users and passwords
userRouter.get('/', userController.showTable, (req, res) => {
  res.status(200).json(res.locals.data);
});

module.exports = userRouter;
