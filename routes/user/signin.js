var express = require('express');
var router = express.Router();
var sql = require('../../database/mysqlLib');
var passport = require('passport/lib');

router.get('/', function(req, res, next) {
        res.render('signin', { title : "Sign In Page" });
});

router.post('/', passport.authenticate('local.signin', {
    failureRedirect: '/signin',
    failureFlash: true
}), function (req, res, next) {
        res.redirect('/');
});

module.exports = router;