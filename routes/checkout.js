var express = require('express');
var router = express.Router();
var sql = require('../database/mysqlLib');

router.get('/',isLoggedIn, function(req, res, next) {
    sql.getCheckoutInfo(req.user, function(err, checkoutInfo) {
        sql.getAllItemsFromShoppingCart(req.user, function(err, itemsInShoppingCart,AllItemsInWarehouse) {
            sql.getPayments(req.user, function (err, payments) {
                for(var i = 0; i<payments.length; i++){
                    payments[i]['Credit Card Number'] = payments[i]['Credit Card Number'].substr(-4,4);
                }
                var totalItem=0;
                for(var i = 0; i<itemsInShoppingCart.length; i++){
                    totalItem = totalItem + parseInt(itemsInShoppingCart[i]['quantity'],10);
                }
                res.render('checkout', {
                    title: "Sahara.com: Checkout",
                    userId: req.user,
                    shopping_cart: itemsInShoppingCart,
                    checkoutInfo: checkoutInfo,
                    paymentInfo: payments,
                    totalItem: totalItem
                });
            });
        });
    });
});

//1. insert into order, order contains items来记录order里的items。用checkout把order和customer连起来
//2. clear shopping cart contains items。
//3. payment pays order记录一下。
//4. insert shipment，employee ships shipment, order has shipment。
//5. warehouse has item --
router.post('/place_order/:id', function(req, res, next){
    var paymentId = (req.body.selectPayment).substring(0, 15);
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1;
    var yyyy = today.getFullYear();
    if(dd<10) dd='0'+dd;
    if(mm<10) mm='0'+mm;
    today = yyyy+'-'+mm+'-'+dd;

    sql.getAllItemsFromShoppingCart(req.user, function(err, itemsInShoppingCart,AllItemsInWarehouse) {
        sql.updateOrder(itemsInShoppingCart, req.body.hiddenTotalPrice, today, paymentId, function (err, orderId) {
            sql.clearShoppingCart(itemsInShoppingCart[0]['shoppingCart Id'],function (err, clearShopping) {
                sql.getCheckoutInfo(req.user, function(err, checkoutInfo) {
                    sql.updateShipments(checkoutInfo, orderId, req.body.shipment,today,function (err, trackingNumber) {
                        sql.updateWarehouse(itemsInShoppingCart,function (err) {
                            res.render('place_order', {
                                title: "Sahara.com: Order Confirmation",
                                order_number: orderId,
                                order_date: today,
                                tracking_number:trackingNumber,
                                user_info:checkoutInfo
                            });
                        });
                    });
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

