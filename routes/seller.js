var express = require('express');
var router = express.Router();
var sql = require('../database/mysqlLib');
/* GET home page. */
router.get('/', function(req, res, next) {
    sql.getAllSellers(function(err, results) {
        res.render('seller', { title : "Sellers", sellers: results });
    });

});

module.exports = router;
