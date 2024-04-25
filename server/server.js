/**
 * server.js
 * 
 * CinemaWorld February 4th, 2024
 * 
 * Osman Elias
 * 
 * 
 *  app file to run application
 * 
 */

require('dotenv').config();
const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');
const bodyParser = require('body-parser');
const path = require('path');
const flash = require('connect-flash');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const app = express();

app.use(helmet()); // Set security-related HTTP headers
app.use(rateLimit({ // Basic rate-limiting middleware
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // Limit each IP to 100 requests per windowMs
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false, httpOnly: true }
}));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(flash());

const authMiddleware = require('./middleware/authentication');
app.use(authMiddleware.initialize());
app.use(authMiddleware.session());

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Failed to connect to MongoDB', err);
    process.exit(1); // Exit process with failure
  }
};

connectDB();

// Error handling middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err);
  if (process.env.NODE_ENV === 'development') {
    res.status(statusCode).json({ error: err.message, stack: err.stack });
  } else {
    res.status(statusCode).json({ error: 'Internal Server Error' });
  }
});

//Middleware authenticating
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect('./Login');
  }
}

app.get('/', ensureAuthenticated, (req, res) => {
  res.sendFile(path.join(__dirname, '..','..', 'public', 'index.html'));
});


app.post('/register', async (req, res) => {
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

app.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: false
}));

// Start server
const PORT = 8080;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`)).on('error', (err) => {
  console.error('Failed to start server:', err);
});