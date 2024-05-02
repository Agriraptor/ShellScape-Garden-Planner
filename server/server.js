const path = require('path');
const express = require('express');
require('dotenv').config();

const userRouter = require('./routes/userRoutes');
const plantDataController = require('./controllers/plantDataController');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use(express.static(path.resolve(__dirname, '../dist')));

// Route to fetch plant data based on location
app.get('/plant?:location', plantDataController.getPlants, (req, res) => {
  res.status(200).json(res.locals.plants);
});

// Redirect all user routes to the user router
app.use('/user', userRouter);

// Route for the homepage
app.get('/', (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, '../index.html'));
});

// If route is undefined,
app.use('*', (req, res) => {
  // return 404 message
  return res.sendStatus(404);
});

// Global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port: ${port}...`);
});

module.exports = app;
