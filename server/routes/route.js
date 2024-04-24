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
  }
  res.redirect('/login');
}

router.get('/', ensureAuthenticated, (req, res) => {
  res.sendFile(path.join(__dirname, '..','..', 'public', 'index.html'));
});

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

router.post('/register', async (req, res) => {
    try {
        const newUser = new User(req.body);
        await newUser.save();
        res.redirect('/login'); // Redirect to login on successful registration
      } catch (error) {
        // Check for duplicate key error
        if (error.code === 11000) {
          return res.status(400).send("Email or username already exists.");
        }
        console.error(error); // Log the error for debugging
        return res.status(500).send("An error occurred.");
      }
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: false
}));

module.exports = router;