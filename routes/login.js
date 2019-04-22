var express = require('express');
var router = express.Router();
var sql = require('../database/mysqlLib');

/* GET home page. */
router.get('/', function(req, res, next) {
        res.render('login', { title : "Log In Page" });
});

function check1(){
    alert("logged");
}
module.exports = router;