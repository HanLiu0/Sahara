var express = require('express');
var router = express.Router();
var sql = require('../database/mysqlLib');

router.get('/:id', isLoggedIn, function (req, res, next) {
    sql.getItemByID(req.params.id, function (err, preresult, results, result_with_rating) {
        res.render('item', {title: "Item Page",item: results[0],no_review: preresult[0]===undefined,list: results,sum:0, rate: result_with_rating[0]});
    });
});

router.post('/item_review/:id', function(req, res, next){
    //sql.editItemReview(req.params.id, req.user, req.body.rating,req.body.detail,req.date);
    res.redirect('/item/'+req.params.id); //refresh a page
});

module.exports = router;

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/signin');
}
