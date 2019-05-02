var express = require('express');
var router = express.Router();
var sql = require('../database/mysqlLib');


router.get('/all_sellers',  function (req, res, next) {
    sql.getAllSellers(function (err,results) {
        res.render('all_sellers', {title: "All Seller Page", sellers: results});
    });
});

router.get('/:id',  function (req, res, next) {
    sql.getSellerForPage(req.params.id, function (err,checkItem, checkReview, reviewResult, itemResult, userInfo, avgInfo) {
        res.render('seller', {title: "Seller Page", items: itemResult, no_review: checkReview[0]===undefined, reviews: reviewResult,
            no_item: checkItem[0]===undefined, user: userInfo[0], avg: avgInfo[0]});
    });
});

router.post('/seller_review/:id',  function (req, res, next) {
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()+' '+today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    sql.editSellerReview(req.params.id, req.user, req.body.rating,req.body.detail,date);
    sql.getSellerForPage(req.params.id, function (err,checkItem, checkReview, reviewResult, itemResult, userInfo, avgInfo) {
        res.render('seller', {title: "Seller Page", items: itemResult, no_review: checkReview[0]===undefined, reviews: reviewResult,
            no_item: checkItem[0]===undefined, user: userInfo[0], avg: avgInfo[0]});
    });
});






module.exports = router;