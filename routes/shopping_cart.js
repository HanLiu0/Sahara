var express = require('express');
var router = express.Router();
var sql = require('../database/mysqlLib');

router.get('/', function(req, res, next) {
    sql.getAllItemsFromShoppingCart(function(err, ShoppingResults,AllItemsInWarehouse) {
        var mostRecommend = [];
        for(var i = 0 ; i < 2; i++){
            mostRecommend[i] = [];
            for(var j = 0 ; j < 5; j++){
                if(AllItemsInWarehouse[i*5+j] == null){
                    break;
                }
                mostRecommend[i].push(AllItemsInWarehouse[i*5+j]);
            }
        }
    res.render('shopping_cart', {title: "Sahara.com Shopping Cart", shopping_cart: ShoppingResults, recommend: mostRecommend});
    });
});

router.delete('/', function(req, res, next) {
    console.log(req.body);
    sql.deleteShoppingCartInformation(req.body);
    res.redirect('/');
});

router.post('/', function(req, res, next){
    console.log(req.body);
    sql.editShoppingCartInformation(req.body);
    res.redirect('/');
});

module.exports = router;
