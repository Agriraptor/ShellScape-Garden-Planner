const db = require('../models/userModel');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const userController = {};

// helper function to create fileController error objects
// return value will be the object we pass into next, invoking global error handler
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
// Create new user
userController.createUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    // Check if username exists on database
    const existingUserQuery = 'SELECT * FROM users WHERE username = $1';
    const existingUser = await db.query(existingUserQuery, [username]);
    if (existingUser.rows.length === 1) {
      //If it exists return an error message
      res.locals.userCreated = false;
      return next();
    } else {
      // generate salt
      const salt = await bcrypt.genSalt(saltRounds);
      // hash password
      const hashedPassword = await bcrypt.hash(password, salt);
      const values = [username, hashedPassword];
      // create new user
      const createUserQuery =
        'INSERT INTO users (username, password) OUTPUT INSERTED.username VALUES($1, $2)';
      const newUser = await db.query(createUserQuery, values);
      res.locals.userCreated = true;
    }
    return next();
  } catch (err) {
    return next(
      createErr({
        method: 'createUser',
        type: 'Database',
        err: err,
      })
    );
  }
};

//Check login credentials vs database
userController.loginUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    //check db for username existing
    const userQuery = 'SELECT * FROM users WHERE username = $1';
    const value = [username];
    const exist = await db.query(userQuery, value);
    if (exist.rows.length !== 1) {
      res.locals.user = false;
      return next();
    }
    //if database returns a value check if passed in password matches what is stored on the database
    const result = await bcrypt.compare(password, exist.rows[0].password);
    //if false return false
    if (!result) {
      res.locals.user = false;
      return next();
    } else {
      res.locals.user = true;
      return next();
    }
  } catch (error) {
    return next(
      createErr({
        method: 'loginUser',
        type: 'Database',
        err: err,
      })
    );
  }
};

userController.showTable = (req, res, next) => {
  const pullTable = 'SELECT * FROM users';
  db.query(pullTable)
    .then((data) => {
      res.locals.data = data.rows;
      return next();
    })
    .catch((error) => {
      console.log(error);
      return next(
        createErr({
          method: 'showTable',
          type: 'Database',
          err: err,
        })
      );
    });
};

module.exports = userController;
