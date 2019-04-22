var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('edit_account_information', { title : "Edit Account Information"});
});
module.exports = router;
