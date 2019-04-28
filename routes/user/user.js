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
    sql.getSellerByID(req.user, function(err, result){
        var isSeller = result.length > 0;
        var messages = req.flash('addSellerMessage');
        res.render('user/account_overview', {
            title: "Your Account",
            isSeller: isSeller,
            messages: messages[0], errors: messages.length > 0
        });
    });
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
    res.render('user/payment_options', {
        title: "Payment Options"
    });
});

router.post('/seller_sign_up', function (req, res, next) {
    sql.addSeller(req, function (err, results1) {
        req.flash('addSellerMessage', 'Successfully signed up');
        res.redirect('/user/account_overview');
    });
});

router.get('/account_overview/listed_items/:page?', isSeller , function (req, res, next) {
    var messages = req.flash('editItemMessage');
    sql.getItemsFromWarehouse(function (err, results) {
        var page = 1;
        if(req.params.page != undefined)
            page = req.params.page[req.params.page.length -1];
        var totalPages = [];
        for(var i = 1; (i-1)*10 < results.length; i+=1)
            totalPages.push(i);
        var items = results.slice((page-1)*10, page*10);
        res.render('user/listed_items', {
            title: "Listed Items",
            items: items,
            totalPages: totalPages,
            itemTypes: getItemTypes(),
            messages: messages[0],
            errors: messages.length > 0
        });
    });
});

router.post('/account_overview/edit_item/:id', isSeller, function (req, res, next) {
    sql.editItem(req.params.id, req, function (err, results) {
        req.flash('editItemMessage', 'Successfully edited');
        res.redirect('/user/account_overview/listed_items');
    });
});

router.get('/account_overview/add_item', isSeller, function (req, res, next) {
    var messages = req.flash('addItemMessage');
    res.render('user/add_item', {
        title: "Add Item",
        messages: messages[0],
        errors: messages.length > 0,
        itemTypes: getItemTypes()
    });
});

router.post('/account_overview/add_item', isSeller, function (req, res, next) {
    sql.addItem(req, function (err, results) {
        var imageFile = req.files.image;
        var s = results + "";
        while (s.length < 15)
            s = "0" + s;
        imageFile.mv('./public/images/' + s + ".jpg", function(err){
            if(err){
                console.log(err);
                return;
            }
            else{
                req.flash('addItemMessage', 'Successfully added');
                res.redirect('/user/account_overview/add_item');
            }
        });
    });
});

router.get('/account_overview/edit_seller_information', isSeller, function (req, res, next) {
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

router.post('/account_overview/edit_seller_information', isSeller, function (req, res, next) {
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

function isSeller(req, res, next) {
    sql.getSellerByID(req.user, function(err, result){
       if(result.length > 0)
           return next();
        else
            res.redirect('/user/account_overview');
    });
}

function getItemTypes(){
    return ["Books", "Clothing/ Shoes/ Jewelry", "Electronics", "Entertainment", "Furniture", "Health care", "Home & Kitchen", "Music Instruments", "Pet Supplies", "Snake/Food", "Toy/Game/Movie"];
}