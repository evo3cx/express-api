const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Post schema
 */

const PostSchema = new Schema({
  title: { type: String, default: '' },
  content: { type: String, default: '' },
});

/**
 * Register
 */

module.exports = mongoose.model('Post', PostSchema);
