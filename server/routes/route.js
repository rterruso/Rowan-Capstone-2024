// route.js
const express = require('express');
const router = express.Router();
const passport = require('passport');
const path = require('path');
const User = require('../models/User'); 

//Middleware authenticating
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect('/login');
  }
}

router.get('/', ensureAuthenticated, (req, res) => {
  res.sendFile(path.join(__dirname, '..','..', 'public', 'index.html'));
});


router.post('/register', async (req, res) => {
  try {
    
    const { username, email, password } = req.body;

    // Create a new User instance with the extracted fields
    const newUser = new User({ username, email, password });

   
    await newUser.save();

    // Redirect to login on successful registration
    res.redirect('/login');
  } catch (error) {
    // Check for a MongoDB duplicate key
    if (error.code === 11000) {
      return res.status(400).send("Email or username already exists.");
    }
    
    // Log the full error for debugging purposes
    console.error('Registration error:', error);

    // Send a generic error response
    return res.status(500).send("An error occurred during registration.");
  }
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: false
}));

module.exports = router;