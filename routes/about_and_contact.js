var express = require('express');
var router = express.Router();
var sql = require('../database/mysqlLib');


router.get('/',  function (req, res, next) {
    res.render('about_contact', {title: "Sahara.com: about/contact"});
});

module.exports = router;