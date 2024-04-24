/**
 * app.js
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

// Import routes
const userRoutes = require('./routes/route');
const apiRoutes = require('./routes/api');

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

// Use routes
app.use('/', userRoutes);
app.use('/', apiRoutes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`)).on('error', (err) => {
  console.error('Failed to start server:', err);
});