var express = require('express');
var router = express.Router();
var sql = require('../../database/mysqlLib');

router.get('/', isLoggedIn, function(req, res, next) {
    sql.getMostPopularItems(function(err, results) {
        res.render('user/account_overview', { title : "Your Account"});
    });

});

router.get('/edit_account_information', isLoggedIn, function(req, res, next) {
    res.render('user/edit_account_information', { title : "Edit Account Information"});
});

router.post('/edit_account_information', function(req, res, next) {
    sql.editAccountInformation(req.body);
    res.redirect('/');
});

router.get('/payment_options', function(req, res, next) {
    res.render('user/payment_options', { title : "Payment Options"});
});

router.get('/listed_items', function(req, res, next) {
    res.render('user/listed_items', { title : "Listed Items"});
});

router.get('/add_item', function(req, res, next) {
    res.render('user/add_item', { title : "Add Item"});
});

router.get('/edit_seller_information', function(req, res, next) {
    res.render('user/edit_seller_information', { title : "Edit Seller Information"});
});
module.exports = router;


function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/signin');
}