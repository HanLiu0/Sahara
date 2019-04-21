var mysql = require('mysql');

var pool = mysql.createPool({
    host: "mysql4.cs.stonybrook.edu",
    user: "bidong",
    password: "111594681",
    database: "bidong"
});

exports.getItems = function(callback) {
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

exports.getSellers = function(callback) {
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