var express = require('express');
var router = express.Router();
var sql = require('../database/mysqlLib');

router.get('/:id',  function (req, res, next) {
    sql.getItemByID(req.params.id, function (err, preresult, results, result_with_rating) {
        //var messages = req.flash('editSellerMessage');
        console.log(results);
        res.render('item', {title: "Item Page",item: results[0],no_review: preresult[0]===undefined,list: results,sum:0, rate: result_with_rating[0]});
    });
});

router.post('/item_review/:id', function(req, res, next){
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()+' '+today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    sql.editItemReview(req.params.id, req.user, req.body.rating,req.body.detail,date);
    res.redirect('/item/'+req.params.id); //refresh a page
//    sql.getItemByID(req.params.id, function (err, preresult, results, result_with_rating) {
  //      res.render('item', {title: "Item Page",item: results[0],no_review: preresult[0]===undefined,list: results,sum:0, rate: result_with_rating[0]});
   // });
});

router.post('/add_to_cart/:id', function(req, res, next){
    sql.addToShoppingCart(req.params.id, req.user, req.body.quantity);
    res.redirect('/item/'+req.params.id); //refresh a page
});

module.exports = router;

