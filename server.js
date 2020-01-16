// Dependencies
let express = require('express');
let exphbs = require('express-handlebars');
let logger = require('morgan');
let mongoose = require('mongoose');

// Web scraping tools
let axios = require('axios');
let cheerio = require('cheerio');

// Require all models
let db = require('./models');

// Initialize PORT for localhost and heroku
let PORT = process.env.PORT || 8080;

// Initialize Express
let app = express();

// Middleware

// Use morgan logger for loggin requests
app.use(logger('dev'));

// Parse request body as JSON
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Set up public folder 
app.use(express.static('public'));

// Connect to MongoDB on localhost or deployed site
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/NewsScraper";
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

// Handlebars
app.engine(
  'handlebars',
  exphbs({
    defaultLayout: 'main'
  })
);
app.set('view engine', 'handlebars');

// Routes
require('./routes/htmlRoutes')(app, db, axios, cheerio);
require('./routes/apiRoutes')(app);

app.listen(PORT, function() {
  console.log('App running on port: ' + PORT);
});

module.exports = app;