/**
 * testDbConnection.js
 * 
 * CinemaWorld February 4th, 2024
 * 
 * Osman Elias
 * 
 * 
 * Test to see if database works
 */



const mongoose = require('mongoose');
require('dotenv').config(); 

const dbURI = process.env.MONGODB_URI;

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Database connection successful'))
  .catch((err) => console.error('Database connection error:', err));

mongoose.connection.on('connected', () => {
  console.log('Mongoose connected to DB.');
});

mongoose.connection.on('error', (err) => {
  console.error(`Mongoose connection error: ${err}`);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected.');
});


const User = require('../models/User'); 
User.find({})
  .then(users => {
    console.log('Found users:', users);
    mongoose.disconnect(); // Clean disconnect
  })
  .catch(err => {
    console.error('Error finding users:', err);
    mongoose.disconnect(); // Clean disconnect
  });