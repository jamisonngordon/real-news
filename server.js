let express = require("express");
let mongoose = require("mongoose");
let axios = require("axios");
let helpers = require('./helpers.js');

let db = require("./models/Article");
var PORT = process.env.PORT || 3000;
let app = express();

// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));

var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

let MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

app.get("/", function(req, res) {
    helpers.scrapeWebsite(db);
    db.find({})
        .then(function(data) {
            let hbsObject = {
                articles: data
            };
            res.render("index", hbsObject);
        })
        .catch(function(err) {
            res.json(err);
        });
});

app.post("/api/comment/:id", function(req, res) {

    console.log(req.body.val);

    db.findOneAndUpdate({ _id: req.params.id },
        {'$push': {'comments': {'body' : req.body.val}}},
        { new: true })
        .then(function(dbArticle) {
            res.json(dbArticle);
        })
        .catch(function(err) {
            res.json(err);
        });
});

app.delete('/api/comment/:parent/:id', function (req, res) {
    db.updateOne({_id: req.params.parent}, { $pull: {'comments' : { _id: req.params.id}} })
        .then(function (response) {
            console.log(response);
            res.json(response);
        })
        .catch(function (err) {
            console.log(err)
        });
});

// Start the server
app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
});
