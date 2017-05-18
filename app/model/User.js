
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * User schema
 */

const UserSchema = new Schema({
  name: { type: String, default: '' },
  email: { type: String, default: '' },
  password: { type: String, default: '' },
  salt: { type: String, default: '' }
});

/**
 * Register
 */

module.exports = mongoose.model('User', UserSchema);
