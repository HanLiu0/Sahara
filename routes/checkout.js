var express = require('express');
var router = express.Router();
var sql = require('../database/mysqlLib');

router.get('/',isLoggedIn, function(req, res, next) {
    sql.getCheckoutInfo(req.user, function(err, checkoutInfo) {
        sql.getAllItemsFromShoppingCart(req.user, function(err, itemsInShoppingCart,AllItemsInWarehouse) {
            sql.getPayments(req.user, function (err, payments, AllItemsInWarehouse) {
                for(var i = 0; i<payments.length; i++){
                    payments[i]['Credit Card Number'] = payments[i]['Credit Card Number'].substr(-4,4);
                }
                var totalItem=0;
                for(var i = 0; i<itemsInShoppingCart.length; i++){
                    totalItem = totalItem + parseInt(itemsInShoppingCart[i]['quantity'],10);
                }
                res.render('checkout', {
                    title: "Sahara.com Checkout",
                    shopping_cart: itemsInShoppingCart,
                    checkoutInfo: checkoutInfo,
                    paymentInfo: payments,
                    totalItem: totalItem
                });
            });
        });
    });
});

router.post('/edit_in_shopping_cart/:id', function(req, res, next){
    sql.updateOrder(req.params.id, req.user, req.body.quantity);
    res.redirect('/shopping_cart');
});

module.exports = router;

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/signin');
}

