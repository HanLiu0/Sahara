var mysql = require('mysql');

var pool = mysql.createPool({
    host: "mysql4.cs.stonybrook.edu",
    user: "bidong",
    password: "111594681",
    database: "bidong"
});

exports.addUser = function(username, email, password, req, callback){
    var sql1 = "INSERT INTO user (`Email Address`, `Username`, `Password`) values ('" + email + "','" + username +"','"+ password +"')";
    pool.getConnection(function(err, connection) {
        if(err) { console.log(err); callback(true); return; }
        // make the query
        connection.query(sql1, function(err, results) {
            var userid = results.insertId;
            var sql2 = "INSERT INTO customer (`CustomerID`, `First Name`, `Last Name`, `Middle Name`) values ('" + results.insertId + "','" +
                req.body.firstName +"','"+ req.body.lastName + "','" + req.body.middleName + "')";
            var sql3 = "INSERT INTO `shopping cart` (`ShoppingCart Id`) values ('" + results.insertId +"')";
            connection.query(sql2, function(err, results) {
                connection.query(sql3, function(err, results) {
                    var sql4 = "INSERT INTO `customer owns shopping cart` (`Customer Id`, `ShoppingCart Id`) values ('" + userid + "', '" +results.insertId +"')";
                    connection.query(sql4, function(err, results) {
                        connection.release();
                        if (err) {
                            console.log(err);
                            callback(true);
                            return;
                        }
                        callback(false, results);
                    });
                });
            });
        });
    });
};

exports.getUserByID = function(id, callback) {
    var sql = "SELECT * FROM `user` WHERE `UserID` =" + id;
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

exports.getUserByEmail = function(email, callback) {
    var sql = "SELECT * FROM `user` WHERE `Email Address` = '" + email + "'";
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

exports.getUserByUsername = function(username, callback) {
    var sql = "SELECT * FROM `user` WHERE `Username` = '" + username + "'";
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

exports.getCustomerByID = function(id, callback) {
    var sql = "SELECT * FROM `customer` WHERE `CustomerID` =" + id;
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

exports.getSellerByID = function(id, callback) {
    var sql = "SELECT * FROM `seller` WHERE `SellerID` =" + id;
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

exports.editAccountInformation = function(req, callback){
    var sql = 'UPDATE `seller` ' +
        'SET `First Name` = \'' + req.body.firstName + '\', `Last Name` = \'' + req.body.lastName +
        '\', `Middle Name` = \'' + req.body.middleName  + '\', ' +
        ' `Street Address Line 1` = \'' + req.body.address1 + '\', ' +
        '`Street Address Line 2` = \'' + req.body.address2 + '\', ' +
        '`City` = \'' + req.body.city + '\', ' +
        '`State/Province/Region` = \'' + req.body.state + '\', ' +
        '`Country` = \'' + req.body.country + '\', ' +
        '`Zip Code` = \'' + req.body.zipCode + '\', ' +
        '`Phone Number` = \'' + req.body.phoneNumber + '\' ' +
        'WHERE (`CustomerID` = ' + req.user + ');';

    pool.getConnection(function(err, connection) {
        if(err) { console.log(err); }
        // make the query
        connection.query(sql, function(err, results) {
            connection.release();
            callback(false, results);
        });
    });
};

exports.editSellerInformation = function(req, callback){
    var sql = 'UPDATE `seller` ' +
        'SET `Company Name` = \'' + req.body.companyName + '\',' +
        '`Street Address Line 1` = \'' + req.body.address1 + '\', ' +
        '`Street Address Line 2` = \'' + req.body.address2 + '\', ' +
        '`City` = \'' + req.body.city + '\', ' +
        '`State/Province/Region` = \'' + req.body.state + '\', ' +
        '`Country` = \'' + req.body.country + '\', ' +
        '`Zip Code` = \'' + req.body.zipCode + '\', ' +
        '`Phone Number` = \'' + req.body.phoneNumber + '\' ' +
        'WHERE (`SellerID` = ' + req.user + ');';

    pool.getConnection(function(err, connection) {
        if(err) { console.log(err); }
        // make the query
        connection.query(sql, function(err, results) {
            connection.release();
            callback(false, results);
        });
    });
};

exports.changePassword = function(req, callback){
    var oldPassword = req.body.currentPassword;
    var error = false;
    this.getUserByID(req.user,function(err, results) {
        if(results[0]['Password'] !== oldPassword){
            callback(true);
            return;
        }
        else{
            var sql = 'UPDATE `user` ' +
                'SET `password` = \'' + req.body.newPassword + '\'' +
                ' WHERE (`UserID` = ' + req.user +'); ';
            pool.getConnection(function(err, connection) {
                if(err) { console.log(err); }
                connection.query(sql, function(err, results) {
                    connection.release();
                    callback(false, results);
                });
            });
        }
    });
};


exports.addSeller = function(req, callback){
    var sql = 'INSERT INTO `seller`(`SellerID`, `Company Name`, `Street Address Line 1`, `Street Address Line 2`, `City`,' +
        '`State/Province/Region`, `Country`, `Zip Code`, `Phone Number`) values (\'' +
        req.user + '\', \'' +
        req.body.companyName + '\', \'' +
        req.body.address1 + '\', \'' +
        req.body.address2 + '\', \'' +
        req.body.city + '\', \'' +
        req.body.state + '\', \'' +
        req.body.country + '\', \'' +
        req.body.zipCode + '\', \'' +
        req.body.phoneNumber + '\')';

    pool.getConnection(function(err, connection) {
        if(err) { console.log(err); }
        // make the query
        connection.query(sql, function(err, results) {
            connection.release();
            callback(false, results);
        });
    });
};

exports.addItem = function(req, callback){
    var sql1 = "INSERT INTO item (`Item Name`, `Type`, `Price`, `Description`) values ('" + req.body.itemName + "','" + req.body.type +"','"+ req.body.price+"','"+ req.body.description +"')";
    pool.getConnection(function(err, connection) {
        if(err) { console.log(err); callback(true); return; }
        // make the query
        connection.query(sql1, function(err, results) {
            var itemID = results.insertId;
            var sql2 = "INSERT INTO `warehouse has item` (`Item ID`, `Warehouse ID`, `Quantity`) values ('" + itemID + "','11111','" + req.body.quantity + "')";
            var sql3 = "INSERT INTO `seller supplies item` (`Item ID`, `Warehouse ID`, `Seller ID`) values ('" + itemID + "','11111','" + req.user + "')";
            connection.query(sql2, function(err, results) {
                connection.query(sql3, function(err, results) {
                    connection.release();
                    if (err) {
                        console.log(err);
                        callback(true);
                        return;
                    }
                    callback(false, itemID);
                });
            });
        });
    });
};

exports.editItem = function(id, req, callback){
    var sql1 = 'UPDATE `item` ' +
        'SET `Item Name` = \'' + req.body.itemName + '\',' +
        '`Type` = \'' + req.body.type + '\', ' +
        '`Price` = \'' + req.body.price + '\', ' +
        '`Description` = \'' + req.body.description + '\', ' +
        'WHERE (`ItemID` = ' + id + ');';
    var sql2 = 'UPDATE `warehouse has item` ' +
        'SET `Quantity` = \'' + req.body.quantity + '\',' +
        'WHERE (`Item ID` = ' + id + ');';
    pool.getConnection(function(err, connection) {
        if(err) { console.log(err); }
        // make the query
        connection.query(sql1, function(err, results) {
            connection.query(sql2, function(err, results) {
                connection.release();
                callback(false, results);
            });
        });
    });
};

exports.getItemsFromWarehouse = function(callback) {
    var sql = "SELECT * FROM `item` INNER JOIN `warehouse has item` ON `item`.`ItemID` = `warehouse has item`.`Item ID` WHERE `warehouse has item`.Quantity>0";
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

exports.getMostPopularItems = function(callback) {
    var sql = "SELECT T.`Item ID`, SUM(T.Quantity) " +
        "AS Quantity FROM `order contains item` T  " +
        "GROUP BY T.`Item ID` ORDER BY Quantity DESC";
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

exports.getRecommendItemsFromOrderHistory = function(req, callback) {
    var sql = "SELECT * FROM `item` INNER JOIN `warehouse has item`"+
        " ON `item`.`ItemID` = `warehouse has item`.`Item ID` WHERE `warehouse has item`.Quantity>0 AND"+
        " `item`.`Type` IN (Select Type From `order contains item`" +
        " INNER JOIN `item` On `order contains item`.`Item ID` = `Item`.`ItemID`" +
        " INNER JOIN `checkout` On `checkout`.`order number` = `order contains item`.`Order ID` " +
        " WHERE `checkout`.`shoppingCart ID` = '" + req.user + "')";
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

exports.getSellerItems = function(req, callback) {
    var sql = "SELECT * FROM item INNER JOIN `seller supplies item` ON `seller supplies item`.`Item ID` = `item`.`ItemID` WHERE `seller supplies item`.`Seller ID` = " +
        req.user;
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

exports.getAllItemsFromShoppingCart = function(userId, callback){
    var sql1 = "SELECT `ShoppingCart Id` FROM `customer owns shopping cart` WHERE `Customer Id` = " + userId;
    pool.getConnection(function(err, connection) {
        if(err) { console.log(err); callback(true); return; }
        // make the query
        connection.query(sql1, function(err, results) {
            var copyResults = results;
            var sql2 = "Select * From `shopping cart contains items`" +
                " INNER JOIN `item` On `shopping cart contains items`.`ItemID` = `Item`.`ItemID`" +
                " INNER JOIN `shopping cart` On `shopping cart`.`ShoppingCart Id` = `shopping cart contains items`.`shoppingCart Id`" +
                " INNER JOIN `warehouse has item` ON `warehouse has item`.`Item ID` = `shopping cart contains items`.`ItemID`"+
                " WHERE `shopping cart contains items`.`shoppingCart Id` = " + results[0]['ShoppingCart Id'];
            connection.query(sql2, function(err, results) {
                if (err) { console.log(err); callback(true); return;}
                //This gets the items in current stock.
                var sql3 = "SELECT * FROM `item` INNER JOIN `warehouse has item`"+
                    " ON `item`.`ItemID` = `warehouse has item`.`Item ID` WHERE `warehouse has item`.Quantity>0 AND"+
                    " `item`.`Type` IN (Select Type From `shopping cart contains items`" +
                    " INNER JOIN `item` On `shopping cart contains items`.`ItemID` = `Item`.`ItemID`" +
                    " INNER JOIN `shopping cart` On `shopping cart`.`ShoppingCart Id` = `shopping cart contains items`.`shoppingCart Id`" +
                    " WHERE `shopping cart contains items`.`shoppingCart Id` = " + copyResults[0]['ShoppingCart Id'] + ")";
                connection.query(sql3, function(err, recmFromShoppingCart){
                    connection.release();
                    callback(false, results, recmFromShoppingCart);
                });
            });
        });
    });
}
exports.removeItemFromShoppingCart = function(itemID, userID, callback){
    var sql1 = "SELECT `ShoppingCart Id` FROM `customer owns shopping cart` WHERE `Customer Id` = " + userID;
    pool.getConnection(function(err, connection) {
        if(err) { console.log(err); callback(true); return; }
        // make the query
        connection.query(sql1, function(err, shoppingCartId) {
            if(err) { console.log(err); callback(true); return; }
            var sql2 ='DELETE FROM `shopping cart contains items` WHERE `shoppingCart Id` = '+shoppingCartId[0]['ShoppingCart Id']
                + ' AND `ItemID` = '+ itemID;
            connection.query(sql2, function(err, results) {
                connection.release();
                if(err) { console.log(err); callback(true); return; }
            });
        });
    });
}

exports.editItemInShoppingCart = function(itemID,userID, quantity, callback){
    var sql1 = "SELECT `ShoppingCart Id` FROM `customer owns shopping cart` WHERE `Customer Id` = " + userID;
    pool.getConnection(function(err, connection) {
        if(err) { console.log(err); callback(true); return; }
        connection.query(sql1, function(err, shoppingCartId) {
            var sql2 = 'UPDATE `shopping cart contains items` SET quantity = ' + quantity +
                ' WHERE `shoppingCart Id` = ' + shoppingCartId[0]['ShoppingCart Id']
                + ' AND `ItemID` = ' + itemID;
            connection.query(sql2, function (err, results) {
                connection.release();
                if (err) {
                    console.log(err);callback(true);return;
                }
            });

        });
    });
}

exports.getCheckoutInfo = function(userId, callback){
    var sql = "SELECT * FROM `customer` WHERE `CustomerID` = " + userId;
    pool.getConnection(function(err, connection) {
        if(err) { console.log(err); callback(true); return; }
        connection.query(sql, function(err, results) {
            connection.release();
            if(err) { console.log(err); callback(true); return; }
            callback(false, results);
        });
    });
}

exports.getPayments = function(userId, callback){
    var sql = "SELECT * FROM `customer saves payment` INNER JOIN `payment` " +
        "ON `customer saves payment`.`PaymentId` = `payment`.`PaymentId` " +
        "WHERE `CustomerID` = " + userId;
    pool.getConnection(function(err, connection) {
        if(err) { console.log(err); callback(true); return; }
        connection.query(sql, function(err, results) {
            connection.release();
            if(err) { console.log(err); callback(true); return; }
            callback(false, results);
        });
    });
}

exports.updateOrder = function(userId, callback){
    console.log("apple");
}