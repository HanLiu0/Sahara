var express = require('express');
var router = express.Router();
var sql = require('../database/mysqlLib');

router.get('/',isLoggedIn, function(req, res, next) {
    sql.getAllItemsFromShoppingCart(req.user, function(err, ShoppingResults,AllItemsInWarehouse) {
        sql.getRecommendItemsFromOrderHistory(req, function(err, recomFromOrderHis){
            var mostRecommend = [];
            if(AllItemsInWarehouse.length!=0){
                for(var i = 0 ; i < 2; i++){
                    mostRecommend[i] = [];
                    for(var j = 0 ; j < 5; j++){
                        mostRecommend[i].push(AllItemsInWarehouse[i*5+j]);
                    }
                }
            }
            else if (recomFromOrderHis.length!=0){
                for(var i = 0 ; i < 2; i++){
                    mostRecommend[i] = [];
                    for(var j = 0 ; j < 5; j++){
                        mostRecommend[i].push(recomFromOrderHis[i*5+j]);
                    }
                }
            }
            res.render('shopping_cart', {title: "Sahara.com: Shopping Cart",
                shopping_cart: ShoppingResults, recommend: mostRecommend});

        });
    });
});

router.get('/remove_from_shopping_cart/:id', function(req, res, next) {
    sql.removeItemFromShoppingCart(req.params.id, req.user);
    res.redirect('/shopping_cart');
});

router.post('/edit_in_shopping_cart/:id', function(req, res, next){
    sql.editItemInShoppingCart(req.params.id, req.user, req.body.quantity);
    res.redirect('/shopping_cart');
});

module.exports = router;

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/signin');
}

