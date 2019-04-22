var express = require('express');
var router = express.Router();
var sql = require('../database/mysqlLib');

router.get('/', function(req, res, next) {
    sql.getAllItemsFromShoppingCart(function(err, results) {
        res.render('shopping_cart', { title : "Sahara.com Shopping Cart", shopping_cart: results });
    });
});

module.exports = router;
