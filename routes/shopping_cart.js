var express = require('express');
var router = express.Router();
var sql = require('../database/mysqlLib');

router.get('/',isLoggedIn, function(req, res, next) {
    sql.getAllItemsFromShoppingCart(req.user, function(err, ShoppingResults,AllItemsInWarehouse) {
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

router.get('/remove_from_shopping_cart/:id', function(req, res, next) {
    sql.removeItemFromShoppingCart(req.params.id, req.user);
    res.redirect('/shopping_cart');
});

router.get('/reduce_in_shopping_cart/:id', function(req, res, next){
    sql.reduceItemInShoppingCart(req.params.id, req.user);
    res.redirect('/shopping_cart');
});
router.get('/add_in_shopping_cart/:id', function(req, res, next){
    sql.addItemInShoppingCart(req.params.id, req.user);
    res.redirect('/shopping_cart');
});


module.exports = router;

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/signin');
}

