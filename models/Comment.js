let mongoose = require('mongoose');

// Reference to Schema constructor
let Schema = mongoose.Schema;

// Create new Schema object for Articles
let CommentSchema = new Schema({
  body: String
});

// Create the model from schema.
let Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;

