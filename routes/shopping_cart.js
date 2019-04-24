var express = require('express');
var router = express.Router();
var sql = require('../database/mysqlLib');

router.get('/', function(req, res, next) {
    var mostRecommend = [];
    var counter =0;
    var innerCounter=0;
    mostRecommend[counter] = [];
    sql.getAllItemsFromShoppingCart(function(err, ShoppingResults,AllItemsInWarehouse) {
    for(var i=0; i<ShoppingResults.length; i++){
        for(var j =0; j< AllItemsInWarehouse.length; j++){
            if((ShoppingResults[i]['Type'] == AllItemsInWarehouse[j]['Type']) && innerCounter<10){
                if(innerCounter!=0 && innerCounter%5 == 0){
                    counter++;
                    mostRecommend[counter] = [];
                }
                var found = false;
                for(var z =0; z<=counter; z++){
                    for(var k = 0; k < mostRecommend[z].length; k++){
                        if(mostRecommend[z][k] == AllItemsInWarehouse[j]['ItemID']){
                            found = true;
                        }
                    }
                }
                if(!found){
                    mostRecommend[counter].push(AllItemsInWarehouse[j]['ItemID']);
                    innerCounter++;
                }
            }
        }
    }
    //console.log(mostRecommend);
    res.render('shopping_cart', {title: "Sahara.com Shopping Cart", shopping_cart: ShoppingResults, recommend: mostRecommend});
    });
});

router.delete('/', function(req, res, next) {
    console.log(req.body);
    sql.deleteShoppingCartInformation(req.body);
    res.redirect('/');
});

router.post('/', function(req, res, next){
    console.log(req.body);
    sql.editShoppingCartInformation(req.body);
    res.redirect('/');
});

module.exports = router;
