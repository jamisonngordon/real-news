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

                console.log('title: ', result.title);
                console.log('link: ', result.link);
                console.log('summary: ', result.summary);

                db.findOne({'title': result.title}, function(findError, doc){
                    if(!doc) {
                        db.create(result)
                            .then(function(dbArticle) {
                                console.log(dbArticle);
                            })
                            .catch(function(err) {
                                console.log(err);
                            });
                    }
                });
            });
        });
    },
    formListView() {

    }
};