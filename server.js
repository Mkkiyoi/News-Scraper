// Dependencies

let express = require('express');
let mongojs = require('mongojs');

// Initialize Express
let app = express();

// Initialize PORT for localhost and heroku
let PORT = process.env.PORT || 8080;

// Static Folder
app.use(express.static('public'));

// Database Configuration
let databaseURL = 'NewsDB';
let collections = ['articles'];

// Hook database to db variable
let db = mongojs(databaseURL, collections);

// Log errors from db to console
db.on('error', function(error) {
  console.log('Database Error', error);
});

app.listen(PORT, function() {
  console.log('App running on port: ' + PORT);
});