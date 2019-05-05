var express = require('express');
var router = express.Router();
var sql = require('../database/mysqlLib');

router.get('/:category/:orderby/:page?', function(req, res, next){
    var page = 1;
    if(req.params.page != undefined)
        page = req.params.page[req.params.page.length -1];
    var types = ["all", "books", "clothing, shoes, jewelry", "electronics",  "health Care", "home & kitchen", "music instrument", "pet supplies", "snack, food", "toy, game, movie"];
    if(!types.includes((req.params.category.toLowerCase()))){
        sql.searchAllItem(req.params.category, req.params.orderby, function (err, result) {
            res.render('view', {title: "Sahara.com: All "+req.params.category , items:result.slice((page-1)*10, page*10), all: req.params.category === 'all',
                type: req.params.category, pagelink: '/view/' + req.params.category + '/' + req.params.orderby + '/',totalPages: getTotalPages(result)});
        });
    }
    else if(req.params.orderby === 'high_to_low'){
        sql.sortItemHighToLow(req.params.category, function (err, result) {
            res.render('view', {title: "Sahara.com: All "+req.params.category , items:result.slice((page-1)*10, page*10), all: req.params.category === 'all',
                type: req.params.category, pagelink: '/view/' + req.params.category + '/' + req.params.orderby + '/',totalPages: getTotalPages(result)});
        });
    }else if(req.params.orderby === 'low_to_high'){
        sql.sortItemLowToHigh(req.params.category, function (err, result) {
            res.render('view', {title: "Sahara.com: All "+req.params.category , items:result.slice((page-1)*10, page*10), all: req.params.category === 'all',
                type: req.params.category, pagelink: '/view/' + req.params.category + '/' + req.params.orderby + '/',totalPages: getTotalPages(result)});
        });
    }
    else if(req.params.orderby === 'default'){
        sql.getItemByType(req.params.category, function (err, result) {
            res.render('view', {title: "Sahara.com: All "+req.params.category , items:result.slice((page-1)*10, page*10), all: req.params.category === 'all',
                type: req.params.category, pagelink: '/view/' + req.params.category + '/' + req.params.orderby + '/',totalPages: getTotalPages(result)});
        });
    }
    else if(req.params.orderby === 'review_score'){
        sql.sortItemReview(req.params.category, function (err, result) {
            res.render('view', {title: "Sahara.com: All "+req.params.category , items:result.slice((page-1)*10, page*10), all: req.params.category === 'all',
                type: req.params.category, pagelink: '/view/' + req.params.category + '/' + req.params.orderby + '/',totalPages: getTotalPages(result)});
        });
    }

});

function getTotalPages(result){
    var totalPages = [];
    for(var i = 1; (i-1)*10 < result.length; i+=1)
        totalPages.push(i);
    return totalPages;
}

router.post('/search/all',  function (req, res, next) {
    var search = req.body.search;
    if(req.body.search === '')
        search = 'all';
    res.redirect("/view/" + search + "/default");
});


module.exports = router;
