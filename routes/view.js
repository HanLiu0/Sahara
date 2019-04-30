var express = require('express');
var router = express.Router();
var sql = require('../database/mysqlLib');

router.get('/:category',  function (req, res, next) {
    //sql.getItemByID(req.params.id, function (err, preresult, results, result_with_rating) {
        //console.log(req.params.category);
       // res.render('item', {title: "Item Page",item: results[0],no_review: preresult[0]===undefined,list: results,sum:0, rate: result_with_rating[0]});
    //});
    res.redirect("/");
});


module.exports = router;
