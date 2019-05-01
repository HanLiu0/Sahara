var express = require('express');
var router = express.Router();
var sql = require('../database/mysqlLib');

router.get('/all',  function (req, res, next) {
    console.log("here");
    sql.getAllItem( function (err, result) {
        res.render('view', {title: "All items",items:result});
    });
});

router.get('/:category',  function (req, res, next) {
    sql.getItemByType(req.params.category, function (err,result) {
        res.render('view', {title: "All "+req.params.category , items:result});
    });
});



module.exports = router;
