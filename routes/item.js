var express = require('express');
var router = express.Router();
var sql = require('../database/mysqlLib');

router.get('/:id',  function (req, res, next) {
    var messages = req.flash('itemMessage');
    sql.getItemByID(req.params.id, function (err, preresult, results, result_with_rating) {
        res.render('item', {title: "Sahara.com: Item",item: results[0],no_review: preresult[0]===undefined,list: results,sum:0, rate: result_with_rating[0],
            messages: messages[0], errors: messages.length > 0,});
    });
});

router.post('/item_review/:id', function(req, res, next){
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()+' '+today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    sql.editItemReview(req.params.id, req.user, req.body.rating,req.body.detail,date);
    req.flash('itemMessage', 'Successfully submitted the review.');
    res.redirect('/item/'+req.params.id); //refresh a page
});

router.post('/add_to_cart/:id', function(req, res, next){
    sql.addToShoppingCart(req.params.id, req.user, req.body.quantity);
    req.flash('itemMessage', 'Successfully added to shopping cart.');
    res.redirect('/item/'+req.params.id); //refresh a page
});

module.exports = router;

