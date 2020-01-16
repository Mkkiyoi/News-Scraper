let mongoose = require('mongoose');

// Reference to Schema constructor
let Schema = mongoose.Schema;

// Create new Schema object for Articles
let ArticleSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  },
  comment: [{
    type: Schema.Types.ObjectId,
    ref: 'Comment'
  }]
});

// Create the model from schema.
let Article = mongoose.model('Article', ArticleSchema);

// Export the model
module.exports = Article;


