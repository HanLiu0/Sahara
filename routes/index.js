var express = require('express');
var router = express.Router();
var sql = require('../database/mysqlLib');
/* GET home page. */
router.get('/', function(req, res, next) {
  sql.getAllItems(function(err, results) {
    console.log(results);
    res.render('index', { title : "Products", products: results });
  });

});

module.exports = router;
