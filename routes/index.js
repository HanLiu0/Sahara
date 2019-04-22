var express = require('express');
var router = express.Router();
var sql = require('../database/mysqlLib');

router.get('/', function(req, res, next) {
  sql.getAllItems(function(err, results) {
    var recommendation = [];
    for(var i = 0 ; i < 3; i++){
      recommendation[i] = [];
      for(var j = 0 ; j < 5; j++)
        recommendation[i].push(results[i*5+j]);
    }
    res.render('index', { title : "Products", recommendation: recommendation });
  });

});

/*
router.get('/', function(req, res, next) {
  sql.getAllItems(function(err, results) {
    res.render('index', { title : "Products", products: results });
  });

});
*/
module.exports = router;
