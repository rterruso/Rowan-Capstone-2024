/**
 * User.js
 * 
 * CinemaWorld February 4th, 2024
 * 
 * Osman Elias
 * 
 * 
 *  User model schema
 */

const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); // For password hashing

// Define the User schema
const userSchema = new mongoose.Schema({
  username:{
    type: String,
    required: [true, 'Username is required'],
    unique: true,
    trim: true, // Remove whitespace from both ends
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true, // Convert email to lowercase 
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
});

// Hash the user's password before saving to the database
userSchema.pre('save', async function (next) {
  try {
    if (!this.isModified('password')) {
      return next();
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

// Compare the provided password with the stored hashed password
userSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw error;
  }
};

// Create the User model
const User = mongoose.model('User', userSchema);

module.exports = User;