var express = require('express');
var router = express.Router();
var sql = require('../../database/mysqlLib');

router.use('/', isLoggedIn, function (req, res, next) {
    next();
});

router.get('/logout', function (req, res, next) {
    req.logout();
    res.redirect('/');
});

router.get('/account_overview', function (req, res, next) {
    res.render('user/account_overview', {title: "Your Account"});
});

router.get('/account_overview/edit_account_information', function (req, res, next) {
    sql.getCustomerByID(req.user, function (err, results) {
        var messages = req.flash('editMessage');
        res.render('user/edit_account_information', {
            title: "Edit Account Information", customer: results[0],
            messages: messages[0], errors: messages.length > 0
        });
    });
});

router.post('/account_overview/edit_account_information', function (req, res, next) {
    sql.editAccountInformation(req, function (err, results1) {
        req.flash('editMessage', 'Successfully changed');
        res.redirect('/user/account_overview/edit_account_information');
    });
});

router.get('/account_overview/change_password', function (req, res, next) {
    var messages = req.flash('passwordMessage');
    res.render('user/change_password', {title: "Change Password", messages: messages[0], errors: messages.length > 0});
});

router.post('/account_overview/change_password', function (req, res, next) {
    sql.changePassword(req, function (err, results) {
        if (err === true)
            req.flash('passwordMessage', 'Wrong password.');
        else
            req.flash('passwordMessage', 'Successfully changed');
        res.redirect('/user/account_overview/change_password');
    });
});

router.get('/account_overview/payment_options', function (req, res, next) {
    res.render('user/payment_options', {title: "Payment Options"});
});

router.get('/account_overview/listed_items', function (req, res, next) {
    res.render('user/listed_items', {title: "Listed Items"});
});

router.get('/account_overview/add_item', function (req, res, next) {
    res.render('user/add_item', {
        title: "Add Item"
    });
});

router.get('/account_overview/edit_seller_information', function (req, res, next) {
    sql.getSellerByID(req.user, function (err, results) {
        var messages = req.flash('editSellerMessage');
        res.render('user/edit_seller_information', {
            title: "Edit Seller Information",
            messages: messages[0],
            errors: messages.length > 0,
            seller: results[0]
        });
    });
});

router.post('/account_overview/edit_seller_information', function (req, res, next) {
    sql.editSellerInformation(req, function (err, results1) {
        req.flash('editSellerMessage', 'Successfully changed');
        res.redirect('/user/account_overview/edit_seller_information');
    });
});
module.exports = router;


function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/signin');
}