var express = require('express');
var router = express.Router();
var sql = require('../database/mysqlLib');

router.get('/', function(req, res, next) {
    sql.getMostPopularItems(function(err, results) {
        res.render('account_overview', { title : "Your Account"});
    });

});

module.exports = router;
