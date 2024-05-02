// Import the Pool class from the pg library, which is used to create a pool of PostgreSQL clients
const { Pool } = require('pg'); // pg = postgres

// Load environment variables from the .env file
require('dotenv').config();

// Create a new pool to connect to the PostgreSQL database
const pool = new Pool({
  // PostgreSQL connection configuration options
  user: process.env.PG_USER, // PostgreSQL username obtained from environment variables
  host: 'lallah.db.elephantsql.com', // PostgreSQL server host
  database: process.env.PG_USER, // PostgreSQL database name obtained from environment variables
  password: process.env.PG_PASSWORD, // PostgreSQL password obtained from environment variables
  port: 5432, // PostgreSQL server port
});

// Adding some notes about the database here will be helpful for future you or other developers.
// Schema for user table: user_id (auto serialized), username, password

// We export an object that contains a property called query,
// which is a function that returns the invocation of pool.query() after logging the query
// This will be required in the controllers to be the access point to the database
module.exports = {
  // Function to execute SQL queries against the database
  query: (text, params, callback) => {
    // Log the executed query before executing it
    console.log('executed query', text);

    // Return the result of executing the query using the pool
    return pool.query(text, params, callback);
  },
};
