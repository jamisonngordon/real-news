let axios = require('axios');
let cheerio = require("cheerio");

module.exports = {
    scrapeWebsite(db) {
        axios.get("https://www.npr.org/sections/news/").then(function(response) {

            let $ = cheerio.load(response.data);

             $("article").each(function(i, element) {

                let result = {};

                 result.title = $(this).children(".item-info-wrap").children(".item-info").children(".title")
                     .children("a").text();

                 result.summary = $(this).children(".item-info-wrap").children(".item-info").children(".teaser")
                     .children("a").text();

                 result.link = $(this).children(".item-info-wrap").children(".item-info").children(".title")
                     .children("a").attr("href");

                if(result.title && result.summary && result.link) {
                    db.findOne({'title': result.title}, function(findError, doc){
                        if(!doc) {
                            db.create(result)
                                .then(function(dbArticle) {

                                })
                                .catch(function(err) {
                                    console.log(err);
                                });
                        }
                    });
                }
            });
        });
    },
    formListView() {

    }
};