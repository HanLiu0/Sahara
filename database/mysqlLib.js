var mysql = require('mysql');

var pool = mysql.createPool({
    host: "mysql4.cs.stonybrook.edu",
    user: "bidong",
    password: "111594681",
    database: "bidong"
});

exports.getAllItems = function(callback) {
  var sql = "SELECT * FROM Item";
  // get a connection from the pool
  pool.getConnection(function(err, connection) {
    if(err) { console.log(err); callback(true); return; }
    // make the query
    connection.query(sql, function(err, results) {
      connection.release();
      if(err) { console.log(err); callback(true); return; }
      callback(false, results);
    });
  });
};

exports.getAllSellers = function(callback) {
    var sql = "SELECT username FROM user, seller WHERE UserID = SellerID";
    // get a connection from the pool
    pool.getConnection(function(err, connection) {
        if(err) { console.log(err); callback(true); return; }
        // make the query
        connection.query(sql, function(err, results) {
            connection.release();
            if(err) { console.log(err); callback(true); return; }
            callback(false, results);
        });
    });
};

exports.getAllItemsFromShoppingCart = function(callback){
    var sql1 = "SELECT `ShoppingCart Id` FROM `customer owns shopping cart` WHERE `Customer Id` = 000000000000001";
    pool.getConnection(function(err, connection) {
        if(err) { console.log(err); callback(true); return; }
        // make the query
        connection.query(sql1, function(err, results) {
            var sql2 = "Select * From `shopping cart contains items`" +
                " INNER JOIN `item` On `shopping cart contains items`.`ItemID` = `Item`.`ItemID`" +
                " INNER JOIN `shopping cart` On `shopping cart`.`ShoppingCart Id` = `shopping cart contains items`.`shoppingCart Id`" +
                " WHERE `shopping cart contains items`.`shoppingCart Id` = " + results[0]['ShoppingCart Id'];
            connection.query(sql2, function(err, results) {
                if (err) {
                    console.log(err);
                    callback(true);
                    return;
                }
                callback(false, results);
            });
        });
    });
}
