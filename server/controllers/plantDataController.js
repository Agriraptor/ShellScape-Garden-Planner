const Plant = require('../models/plantModel');
const mongoose = require('mongoose');
require('dotenv').config();

const plantDataController = {};

// Function to create error objects for the plantDataController
const createErr = (errInfo) => {
  const { method, type, err } = errInfo;
  return {
    log: `plantDataController.${method} ${type}: ERROR: ${
      typeof err === 'object' ? JSON.stringify(err) : err
    }`,
    message: {
      err: `Error occurred in plantDataController.${method}. Check server logs for more details.`,
    },
  };
};

// Asynchronously handle getting plants data
plantDataController.getPlants = async (req, res, next) => {
  try {
    // Extracting the 'location' parameter from the request query
    const location = req.query.location;
    // Querying the Plant model to find all plants with matching 'State' field
    const data = await Plant.find({ State: location });

    // If no matching data found, throw an error
    if (data.length === 0)
      throw createErr({
        method: 'getPlants',
        type: 'DB',
        err: 'Entry Not found',
      });

    // Store retrieved data in res.locals.plants
    res.locals.plants = data;

    // next middleware
    return next();
  } catch (err) {
    // If error, invoke global error handler
    return next(
      createErr({
        method: `getPlants`,
        type: 'DB',
        err: err,
      })
    );
  }
};

module.exports = plantDataController;
