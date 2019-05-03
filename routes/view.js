var express = require('express');
var router = express.Router();
var sql = require('../database/mysqlLib');

router.get('/all/:page?',  function (req, res, next) {
    sql.getAllItem( function (err, result) {
        var page = 1;
        if(req.params.page != undefined)
            page = req.params.page[req.params.page.length -1];
        var totalPages = [];
        for(var i = 1; (i-1)*10 < result.length; i+=1)
            totalPages.push(i);
        var items = result.slice((page-1)*10, page*10);
        res.render('view', {title: "Sahara.com: All items",items:items, all: true, totalPages: totalPages});
    });
});

router.get('/sort1/:category',  function (req, res, next) {
    sql.sortItemLowToHigh(req.params.category, function (err,result) {
        res.render('view', {title: "Sahara.com: All "+req.params.category , items:result, all:false, type: req.params.category});
    });
});

router.get('/sort2/:category',  function (req, res, next) {
    sql.sortItemHighToLow(req.params.category, function (err,result) {
        res.render('view', {title: "Sahara.com: All "+req.params.category , items:result, all:false, type: req.params.category});
    });
});

router.get('/sort3/:category',  function (req, res, next) {
    sql.sortItemReview(req.params.category, function (err,result) {
        res.render('view', {title: "Sahara.com: All "+req.params.category , items:result, all:false, type: req.params.category});
    });
});

router.get('/sort4/all',  function (req, res, next) {
    sql.sortAllItemHighToLow( function (err, result) {
        res.render('view', {title: "Sahara.com: All items",items:result, all: true});
    });
});

router.get('/sort5/all',  function (req, res, next) {
    sql.sortAllItemLowToHigh( function (err, result) {
        res.render('view', {title: "Sahara.com: All items",items:result, all: true});
    });
});

router.get('/sort6/all',  function (req, res, next) {
    sql.sortAllItemReview( function (err, result) {
        res.render('view', {title: "Sahara.com: All items",items:result, all: true});
    });
});

router.get('/search/all',  function (req, res, next) {
    res.redirect("/");
});


router.get('/:category',  function (req, res, next) {
    sql.getItemByType(req.params.category, function (err,result) {
        res.render('view', {title: "Sahara.com: All "+req.params.category , items:result, all:false, type: req.params.category});
    });
});



module.exports = router;
