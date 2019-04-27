var mongoose = require("mongoose");

var Schema = mongoose.Schema;

let CommentSchema = new Schema({
    body: String
});

var ArticleSchema = new Schema({

    title: {
        type: String,
        required: true
    },

    link: {
        type: String,
        required: true
    },

    summary: {
        type: String,
        required: true
    },

    comments: {
        type: [CommentSchema]
    },

});

// This creates our model from the above schema, using mongoose's model method
var Article = mongoose.model("Article", ArticleSchema);

// Export the Article model
module.exports = Article;