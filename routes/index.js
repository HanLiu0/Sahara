var express = require('express');
var router = express.Router();
var sql = require('../database/mysqlLib');

router.get('/', function(req, res, next) {
  sql.getMostPopularItems(function(err, results) {
    var mostPopular = [];
    for(var i = 0 ; i < 2; i++){
      mostPopular[i] = [];
      for(var j = 0 ; j < 5; j++)
        mostPopular[i].push(results[i*5+j]);
    }
    if(req.user != undefined){
      sql.getRecommendItemsFromOrderHistory(req, function(err, results){
        if(results.length > 0) {
          var recommend = [];
          for (var i = 0; i < 2; i++) {
            recommend[i] = [];
            for (var j = 0; j < 5; j++)
              recommend[i].push(results[i * 5 + j]);
          }
          res.render('index', { title : "Sahara.com: Online Shopping", mostPopular: mostPopular, recommend: recommend });
        }
        else{
          sql.getItemsFromWarehouse(function(err, results){
            var recommend = [];
            for (var i = 0; i < 2; i++) {
              recommend[i] = [];
              for (var j = 0; j < 5; j++)
                recommend[i].push(results[i * 5 + j]);
            }
            res.render('index', { title : "Sahara.com: Online Shopping", mostPopular: mostPopular, recommend: recommend });
          });
        }
      });
    }
    else{
      sql.getItemsFromWarehouse(function(err, results){
        var recommend = [];
        for (var i = 0; i < 2; i++) {
          recommend[i] = [];
          for (var j = 0; j < 5; j++)
            recommend[i].push(results[i * 5 + j]);
        }
        res.render('index', { title : "Sahara.com: Online Shopping", mostPopular: mostPopular, recommend: recommend });
      });
    }
  });

});
module.exports = router;
