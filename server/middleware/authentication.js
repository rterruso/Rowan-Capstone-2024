/**
 * authentication.js
 * 
 * CinemaWorld February 4th, 2024
 * 
 * Osman Elias
 * 
 *  Middleware authentication settings
 */


const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User'); 

// Configure the LocalStrategy for passport
passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
},
async (email, password, done) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      console.log("User not found");
      return done(null, false, { message: 'Incorrect email or password.' });
    }

    console.log("User found, comparing password");
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      console.log("Password does not match");
      return done(null, false, { message: 'Incorrect email or password.' });
    }

    console.log("Password matches, logging in");
    return done(null, user);
  } catch (err) {
    console.log("Error during authentication", err);
    return done(err);
  }
}
));

// Serialize and deserialize user for session management
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

// Export authentication-related functions
module.exports = {
    initialize: () => passport.initialize(),
    session: () => passport.session(),
    authenticate: () => passport.authenticate('local', {
      session: true, 
      successRedirect: '/', 
      failureRedirect: '/login', 
      failureFlash: false, 
    }),
  };
