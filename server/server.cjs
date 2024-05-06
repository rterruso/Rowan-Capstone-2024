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
const cookieParser = require("cookie-parser");
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');
const bodyParser = require('body-parser');
const path = require('path');
const flash = require('connect-flash');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const app = express();
const bcrypt = require('bcrypt');
const User = require('../server/models/User.cjs');

app.set('view engine', 'ejs');
app.use(helmet()); // Set security-related HTTP headers
app.use(rateLimit({ // Basic rate-limiting middleware
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // Limit each IP to 100 requests per windowMs
}));
app.use(cookieParser());
app.use(session({
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: true,
  cookie: { expires: 60000 }
  }
));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(flash());

const authMiddleware = require('./middleware/authentication.cjs');
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
    console.log (res.status(statusCode).json({ error: err.message, stack: err.stack }));
  } else {
    console.log (res.status(statusCode).json({ error: 'Internal Server Error' }));
  }
});

// app.use((error, req, res, next) => {
//   res.status(error.status || 500).json({
//     error: {
//       message: error.message || 'An unknown error occurred.',
//     },
//   });
// });

// // Middleware authenticating
// function ensureAuthenticated(req, res, next) {
//   if (req.isAuthenticated()) {
//     return next();
//   } else {
//     res.redirect('http://localhost:3001/login');
//   }
// }

// app.use(express.static(path.join(__dirname, 'public')));

// app.get('/', (req, res) => {
//   const sessionData = req.session;
//   res.sendFile(path.join(__dirname, '..','..', 'Rowan-Capstone-2024/public', 'index.html'));
// });

// app.get('/', (req, res) => {

//   res.redirect('http://localhost:3000');
// });

app.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    console.log (existingUser != null);

    if (existingUser != null) {
      return res.send({ status: 400, message: "User with this email or username already exists." });
    } else {
      // Create a new User instance with the extracted fields
      const newUser = new User({ username, email, password });

      await newUser.save();

      return res.send({ status: 201, message: "User succesfully registered!" })
    }
  } catch (error) {
    // Log the full error for debugging purposes
    console.error('Registration error: ' + error);

    // Send a generic error response
    return res.send("An error occurred during registration.");
  }
});

// OLD METHOD TO LOGIN
// app.post('/login', passport.authenticate('local', {
//   successRedirect: 'http://localhost:3000',
//   failureRedirect: 'http://localhost:3001/login',
//   failureFlash: false
// }
// ));

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  
  try {
    // Find user by email
    const user = await User.findOne({ email });

    // If user not found or password does not match, return error
    if (!user || !(await user.comparePassword(password, user.password))) {
      return res.send({ status: 400, message: 'Incorrect email or password.' });
    } else {
      // If authentication successful, you can manually establish a session for the user
      req.session.isLoggedIn = true;
      req.session.username = user.username;
      req.session.save();

      return res.send({ status: 201, message: 'User logged in successfully.' });
    }
  } catch (error) {
    console.error('Login error: ' + error);
    return res.send({ message: 'An error occurred during login.' });
  }
});

app.get('/fetch-username', async (req, res) => {
  try {
    if (!req.session.isLoggedIn) {
      return res.send({ status: 401, message: 'User is not authenticated.' });
    } else {
      const username = req.session.username; // Access username from session
      console.log(username);
      return res.send({ status: 201, username: username });
    }
  } catch (error) {
    console.error('Error fetching user:', error);
    return res.send({ status: 400, message: 'An error occurred while fetching user.' });
  }
});

// Logout page 
app.get("/logout", (req, res) => {
  req.session.destroy();
  return res.send({ message: "You are logged out " });
});

// Start server
const PORT = 8080;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`)).on('error', (err) => {
  console.error('Failed to start server:', err);
});