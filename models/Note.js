let mongoose = require('mongoose');

// Reference to Schema constructor
let Schema = mongoose.Schema;

// Create new Schema object for Articles
let NoteSchema = new Schema({
  title: String,
  body: String
});

// Create the model from schema.
let Note = mongoose.model('Note', NoteSchema);

module.exports = Note;

