/**
 * secretKey.js
 * 
 * CinemaWorld February 4th, 2024
 * 
 * Osman Elias
 * 
 * 
 * Test to generate  key
 */


const crypto = require('crypto');
const secret = crypto.randomBytes(32).toString('hex');
console.log(`Your secret key: ${secret}`);