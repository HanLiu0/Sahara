var express = require('express');
var router = express.Router();
var sql = require('../database/mysqlLib');

router.get('/all',  function (req, res, next) {
    sql.getAllItem( function (err, result) {
        res.render('view', {title: "All items",items:result, all: true});
    });
});

router.get('/sort1/:category',  function (req, res, next) {
    sql.sortItemLowToHigh(req.params.category, function (err,result) {
        res.render('view', {title: "All "+req.params.category , items:result, all:false, type: req.params.category});
    });
});

router.get('/sort2/:category',  function (req, res, next) {
    sql.sortItemHighToLow(req.params.category, function (err,result) {
        res.render('view', {title: "All "+req.params.category , items:result, all:false, type: req.params.category});
    });
});

router.get('/sort3/:category',  function (req, res, next) {
    sql.sortItemReview(req.params.category, function (err,result) {
        res.render('view', {title: "All "+req.params.category , items:result, all:false, type: req.params.category});
    });
});

router.get('/sort4/all',  function (req, res, next) {
    sql.sortAllItemHighToLow( function (err, result) {
        res.render('view', {title: "All items",items:result, all: true});
    });
});

router.get('/sort5/all',  function (req, res, next) {
    sql.sortAllItemLowToHigh( function (err, result) {
        res.render('view', {title: "All items",items:result, all: true});
    });
});

router.get('/sort6/all',  function (req, res, next) {
    sql.sortAllItemReview( function (err, result) {
        res.render('view', {title: "All items",items:result, all: true});
    });
});




router.get('/:category',  function (req, res, next) {
    sql.getItemByType(req.params.category, function (err,result) {
        res.render('view', {title: "All "+req.params.category , items:result, all:false, type: req.params.category});
    });
});



module.exports = router;
