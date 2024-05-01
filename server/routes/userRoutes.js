const express = require('express');
const userController = require('../controllers/userController');

const userRouter = express.Router();

// EXPECT THE FOLLOWING FOR SIGNUP LOGIN
// baseurl.com/user/signup
// { username: 'username', password: 'password' }
userRouter.post(
  '/signup',
  userController.checkUser,
  userController.createUser,
  (req, res) => {
    //redirect to creategarden page (frontend)
    res.status(200).json(res.locals.message);
  }
);

//add a route for login
// baseurl.com/user/login
userRouter.post('/login', userController.loginUser, (req, res) => {
  //check if username and password exist on db if not return to sign up page
  res.status(200).json(res.locals.message);
});

//update password
//userRouter.put('/', userControllers.updatePassword);

//grab all users and passwords
userRouter.get('/', userController.showTable, (req, res) => {
  res.sendStatus(200);
});

module.exports = userRouter;
