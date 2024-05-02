const mongoose = require('mongoose');
require('dotenv').config();

// MONGODB URI
const MONGO_URI = process.env.MONGO_URI;

// Connecting to database with credentials
mongoose
  .connect(MONGO_URI)
  .then(() => console.log('Connected to Mongo DB.'))
  .catch((err) => console.log(err));

// Dummy schema since database is only going to be read from
const Schema = mongoose.Schema;
const plantSchema = new Schema({});

// Selecting specific collection to access for relavant data
const Plant = mongoose.model('plant', plantSchema, 'plants6');
module.exports = Plant;
