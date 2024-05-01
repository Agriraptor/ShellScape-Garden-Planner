const express = require('express');
const userController = require('../controllers/userController');

const userRouter = express.Router();

// EXPECT THE FOLLOWING FOR SIGNUP LOGIN
// baseurl.com/user/signup
// { username: 'username', password: 'password' }
userRouter.post('/signup', userController.createUser, (req, res) => {
  //if user was created successfully return 200 status else have frontend redirect
  if (res.locals.userCreated) res.sendStatus(201);
  else res.sendStatus(417);
});

//add a route for login
// baseurl.com/user/login
userRouter.post('/login', userController.loginUser, (req, res) => {
  //check if username and password exist on db if not return to sign up page
  if (res.locals.user) res.sendStatus(200);
  else res.sendStatus(417);
});

//update password
//userRouter.put('/', userControllers.updatePassword);

//grab all users and passwords
userRouter.get('/', userController.showTable, (req, res) => {
  res.sendStatus(200);
});

module.exports = userRouter;
