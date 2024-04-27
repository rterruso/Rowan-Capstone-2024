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
const User = require('../server/models/User');

app.use(helmet()); // Set security-related HTTP headers
app.use(rateLimit({ // Basic rate-limiting middleware
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // Limit each IP to 100 requests per windowMs
}));
// app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false, httpOnly: true }
}));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
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

// app.get('/', ensureAuthenticated, (req, res) => {
//   res.sendFile(path.join(__dirname, '..','..', 'public', 'index.html'));
// });

app.get('/fetch-user', async (req, res) => {
  try {
    const username = req.query.username;

    // Check if user is authenticated
    if (!username) {
      return res.status(401).send({ message: 'User is not authenticated.' });
    }
    // Return the username of the logged-in user
    return res.send({ username: username });
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).send({ message: 'An error occurred while fetching user.' });
  }
});

app.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ $or: [{ email }, { username }] });

    if (existingUser) {
      return res.status(400).send("User with this email or username already exists.");
    }

    // Create a new User instance with the extracted fields
    const newUser = new User({ username, email, password });

    await newUser.save();

    // Redirect to login on successful registration
    res.redirect('http://localhost:8080/login');
  } catch (error) {
    // Log the full error for debugging purposes
    console.error('Registration error: ' + error);

    // Send a generic error response
    return res.status(500).send("An error occurred during registration.");
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
  console.log ("in the login");

  try {
    // Find user by email
    const user = await User.findOne({ email });

    // If user not found or password does not match, return error
    if (!user || !(await bcrypt.comparePassword(password, user.password))) {
      return res.status(401).text({ message: 'Incorrect email or password.' });
    }

    // If authentication successful, you can manually establish a session for the user
    req.session.user = {
      username: user.username,
      email: user.email,
      // Add any other user data you need in the session
    };

    // Redirect or send response indicating successful login
    res.redirect('http://localhost:3000'); // Redirect to dashboard after successful login
    res.redirect(`/fetch-user?username=${user.username}`);

    return res.send ({ message: 'User logged in successfully.' });
  } catch (error) {
    console.error('Login error: ' + error);
    return res.status(500).json({ message: 'An error occurred during login.' });
  }
});

// Start server
const PORT = 8080;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`)).on('error', (err) => {
  console.error('Failed to start server:', err);
});