var express = require('express');
var router = express.Router();
var sql = require('../database/mysqlLib');

router.get('/', function(req, res, next) {
    sql.getMostPopularItems(function(err, results) {
        res.render('account_overview', { title : "Your Account"});
    });

});

router.get('/edit_account_information', function(req, res, next) {
    res.render('edit_account_information', { title : "Edit Account Information"});
});

router.post('/edit_account_information', function(req, res, next) {
    sql.editAccountInformation(req.body);
    res.redirect('/');
});
module.exports = router;
