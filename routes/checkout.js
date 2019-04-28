var express = require('express');
var router = express.Router();
var sql = require('../database/mysqlLib');

router.get('/',isLoggedIn, function(req, res, next) {
    sql.getCheckoutInfo(req.user, function(err, checkoutInfo) {
        sql.getAllItemsFromShoppingCart(req.user, function(err, itemsInShoppingCart,AllItemsInWarehouse) {
            sql.getPayments(req.user, function (err, payments, AllItemsInWarehouse) {
                res.render('checkout', {
                    title: "Sahara.com Checkout",
                    shopping_cart: itemsInShoppingCart,
                    checkoutInfo: checkoutInfo,
                    paymentInfo: payments,
                });
            });
        });
    });
});

module.exports = router;

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/signin');
}

