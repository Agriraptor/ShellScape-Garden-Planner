const db = require('../models/userModel');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const userController = {};

// create error objects for userController
const createErr = (errInfo) => {
  const { method, type, err } = errInfo;
  return {
    log: `userController.${method} ${type}: ERROR: ${
      typeof err === 'object' ? JSON.stringify(err) : err
    }`,
    message: {
      err: `Error occurred in userController.${method}. Check server logs for more details.`,
    },
  };
};

// create a new user
userController.createUser = async (req, res, next) => {
  try {
    // destructuring body response
    const { username, password } = req.body;
    // throw error if invalid input
    if (!username || !password) throw 'Invalid Inputs';
    // Check if username exists
    const existingUserQuery = 'SELECT * FROM users WHERE username = $1';
    const existingUser = await db.query(existingUserQuery, [username]);
    if (existingUser.rows.length === 1) {
      // If it does, return error
      res.locals.userCreated = false;
      return next();
    } else {
      // Generate salt
      const salt = await bcrypt.genSalt(saltRounds);
      // hash the password
      const hashedPassword = await bcrypt.hash(password, salt);
      const values = [username, hashedPassword];
      // Insert new user into database
      const createUserQuery =
        'INSERT INTO users (username, password) VALUES($1, $2)';
      const newUser = await db.query(createUserQuery, values);

      // return true for user creation success
      res.locals.userCreated = true;
    }
    return next();
  } catch (err) {
    // If error, invoke global error handler
    return next(
      createErr({
        method: 'createUser',
        type: 'Database',
        err: err,
      })
    );
  }
};

// Check user login credentials against the database
userController.loginUser = async (req, res, next) => {
  try {
    // destructuring body response
    const { username, password } = req.body;
    // Check if username exists in the database
    const userQuery = 'SELECT * FROM users WHERE username = $1';
    const value = [username];
    const exist = await db.query(userQuery, value);
    // If it doesn't, return false
    if (exist.rows.length !== 1) {
      res.locals.user = false;
      return next();
    }
    // If it does, compare provided password with hashed password
    const result = await bcrypt.compare(password, exist.rows[0].password);
    //
    if (!result) {
      // If passwords don't match, return false
      res.locals.user = false;
      return next();
    } else {
      // If they do, return true
      res.locals.user = true;
      return next();
    }
  } catch (error) {
    // If error, invoke global error handler
    return next(
      createErr({
        method: 'loginUser',
        type: 'Database',
        err: error,
      })
    );
  }
};

// Retrieve user data from database
userController.showTable = (req, res, next) => {
  const pullTable = 'SELECT * FROM users';
  db.query(pullTable)
    .then((data) => {
      // Store retrieved data in res.locals.data an
      res.locals.data = data.rows;
      return next();
    })
    .catch((error) => {
      // If error, log it, invoke global error handler
      return next(
        createErr({
          method: 'showTable',
          type: 'Database',
          err: error,
        })
      );
    });
};

module.exports = userController;
