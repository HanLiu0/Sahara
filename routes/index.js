var express = require('express');
var router = express.Router();
var sql = require('../database/mysqlLib');

router.get('/', function(req, res, next) {
  sql.getMostPopularItems(function(err, results) {
    var mostPopular = [];
    for(var i = 0 ; i < 3; i++){
      mostPopular[i] = [];
      for(var j = 0 ; j < 5; j++)
        mostPopular[i].push(results[i*5+j]);
    }
    //if(user)
      //sql.getRecommendItems
    //else
    res.render('index', { title : "Sahara.com: Online Shopping", mostPopular: mostPopular });
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
