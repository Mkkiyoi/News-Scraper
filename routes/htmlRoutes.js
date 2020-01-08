module.exports = function(app, db) {
    app.get('/', function(req, res) {
        res.redirect('/all');
    });

    app.get('/all', function(req, res) {
        db.articles.find({}, function(error, data) {
            if (error) {
                console.log(error);
                throw error;
            } else {
                res.json(data);
            }
        })
    });
}