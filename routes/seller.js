var express = require('express');
var router = express.Router();
var sql = require('../database/mysqlLib');

router.get('/:id',  function (req, res, next) {
    sql.getSellerForPage(req.params.id, function (err,results) {
        res.render('seller', {title: "Seller Page",seller: results[0], sellers: results});
    });
});


module.exports = router;