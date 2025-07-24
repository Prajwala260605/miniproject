const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  googleId: String,
  name: String,
  email: { type: String, required: true, unique: true },
  password: String // Will be hashed if local signup
});

module.exports = mongoose.model('User', userSchema);
