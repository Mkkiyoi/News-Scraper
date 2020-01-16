module.exports = function(app, db, axios, cheerio) {
    app.get('/', function(req, res) {
        res.render('index');
    });

    // Route for getting all Articles
    app.get('/articles', function(req, res) {
        db.Article.find({}).then(function(dbArticle) {
            res.json(dbArticle);
        }).catch(function(error) {
            req.json(error);
        });
    });

    app.get('/scrape', function(req, res) {
        axios.get('https://old.reddit.com/r/news/').then(function(response) {
            let $ = cheerio.load(response.data);

            // Get [CERTAIN ELEMENT HERE] from every article
            $('p.title').each(function(i, element) {
                // Store results into object
                let result = {};

                // Get the text and href of each article
                result.title = $(this).children('a').text();
                result.link = $(this).children('a').attr('href');

                // Create new Article in database using the result object
                db.Article.create(result).then(function(dbArticle) {
                    console.log(dbArticle);
                }).catch(function(error) {
                    console.log(error);
                });
            });
            // Send message to the client
            res.redirect('/');
        });
    });

    // Route for getting an Article by id, additionally populate it with its Comment
    app.get('/articles/:id', function(req, res) {
        db.Article.findOne({ _id: req.params.id })
            .populate('comment')
            .then(function(dbArticle) {
                res.json(dbArticle);
            }).catch(function(error) {
                res.json(error);
            });
    });

    // Route for posting/updating an Article's Comment
    app.post('/articles/:id', function(req, res) {
        // Create a new Comment and pass the given details from req.body to the Comment.
        db.Comment.create(req.body).then(function(dbComment) {
            console.log(dbComment)
            // Find and return the corresponding Article and update with the added Comment.
            return db.Article.findOneAndUpdate({ _id: req.params.id }, { $push: { "comment": dbComment._id }}, { new: true });
        }).then(function(dbArticle) {
            res.json(dbArticle);
        }).catch(function(error) {
            console.log(error);
        });
    });

    app.get('/clear', function(req, res) {
        db.Article.remove({}).then(function() {
            res.redirect('/');
        }).catch(function(error) {
            console.log(error);
        });
    });

    app.delete('/comments/:id', function(req, res) {
        console.log(req.params.id)
        db.Comment.deleteOne({ _id: req.params.id }).then(function() {
            console.log("Comment removed.")
        }).catch(function(error) {
            console.log(error)
        });
    });
};

