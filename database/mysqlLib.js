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
                    var sql4 = "INSERT INTO `bidong`.`customer owns shopping cart` (`Customer Id`, `ShoppingCart Id`) values ('" + userid + "', '" +results.insertId +"')";
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
    var sql = 'UPDATE `customer` ' +
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
        '`Phone Number` = \'' + req.body.phoneNumber + '\', ' +
        '`Description` = \'' + req.body.description + '\' ' +
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
        '`State/Province/Region`, `Country`, `Zip Code`, `Phone Number`, `Description`) values (\'' +
        req.user + '\', \'' +
        req.body.companyName + '\', \'' +
        req.body.address1 + '\', \'' +
        req.body.address2 + '\', \'' +
        req.body.city + '\', \'' +
        req.body.state + '\', \'' +
        req.body.country + '\', \'' +
        req.body.zipCode + '\', \'' +
        req.body.phoneNumber + '\', \'' +
        req.body.description+ '\')'
    ;

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
        '`Description` = \'' + req.body.description +"' "+
        ' WHERE (`ItemID` = \'' + id + '\');';
    var sql2 = "UPDATE `warehouse has item` " +
        " SET Quantity = '" + req.body.quantity +"' "+
        " WHERE `warehouse has item`.`Item ID` = '" + id + "';";


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

exports.removeItem = function(id, req, callback){
    var sql1 = 'DELETE FROM `warehouse has item` ' +
        'WHERE (`Item ID` =' + id + ');';
    pool.getConnection(function(err, connection) {
        if (err) { console.log(err);}
        connection.query(sql1, function (err, results) {
            connection.release();
            callback(false, results);
        });
    });
};

exports.getItemsFromWarehouse = function(callback) {
    var sql = "SELECT * FROM `item` INNER JOIN `warehouse has item` ON `item`.`ItemID` = `warehouse has item`.`Item ID` WHERE `warehouse has item`.Quantity>0 " +
        "ORDER BY RAND() LIMIT 10";
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
        " INNER JOIN `warehouse has item` On `warehouse has item`.`Item ID` = T.`Item ID`"+
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
        " INNER JOIN `item` On `order contains item`.`Item ID` = `item`.`ItemID`" +
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
    var sql = "SELECT * FROM item INNER JOIN `seller supplies item` ON `seller supplies item`.`Item ID` = `item`.`ItemID` " +
        "INNER JOIN `warehouse has item` ON `item`.`ItemID` = `warehouse has item`.`Item ID`"+
        "WHERE `seller supplies item`.`Seller ID` = " +
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
                " INNER JOIN `item` On `shopping cart contains items`.`ItemID` = `item`.`ItemID`" +
                " INNER JOIN `shopping cart` On `shopping cart`.`ShoppingCart Id` = `shopping cart contains items`.`shoppingCart Id`" +
                " INNER JOIN `warehouse has item` ON `warehouse has item`.`Item ID` = `shopping cart contains items`.`ItemID`"+
                " WHERE `shopping cart contains items`.`shoppingCart Id` = " + results[0]['ShoppingCart Id'];
            connection.query(sql2, function(err, results) {
                if (err) { console.log(err); callback(true); return;}
                //This gets the items in current stock.
                var sql3 = "SELECT * FROM `item` INNER JOIN `warehouse has item`"+
                    " ON `item`.`ItemID` = `warehouse has item`.`Item ID` WHERE `warehouse has item`.Quantity>0 AND"+
                    " `item`.`Type` IN (Select Type From `shopping cart contains items`" +
                    " INNER JOIN `item` On `shopping cart contains items`.`ItemID` = `item`.`ItemID`" +
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

//1. insert into order, order contain items来记录order里的items。用checkout把order和customer连起来
exports.updateOrder = function(itemsInShoppingCart, totalPrice, date, paymentID, callback){
    var shoppingCartId = itemsInShoppingCart[0]['shoppingCart Id'];
    var sql1 = "INSERT INTO `order` (`order date`, `Total price`) values ('" + date +"','"+ totalPrice+ "')";
    pool.getConnection(function(err, connection) {
        if(err) { console.log(err); callback(true); return; }
        connection.query(sql1, function(err, order) {
            var orderID = order.insertId;
            var sql2 = "INSERT INTO `checkout` (`shoppingCart ID`, `order number`) VALUES ('"+ shoppingCartId+"','"+orderID +"')";
            connection.query(sql2, function(err, checkout) {
                var sql3 = " INSERT INTO `bidong`.`order contains item` (`Order ID`, `Item ID`, `quantity`) VALUES ";
                for (var i = 0; i < itemsInShoppingCart.length; i++) {
                    var ItemID = itemsInShoppingCart[i]['ItemID'];
                    var quantity = itemsInShoppingCart[i]['quantity'];
                    if(i!= itemsInShoppingCart.length-1){
                        sql3 = sql3 +"('"+ orderID+ "', '"+ ItemID+ "', '"+quantity+"'), ";
                    }
                    else{
                        sql3 = sql3 +"('"+ orderID+ "', '"+ ItemID+ "', '"+quantity+"'); ";
                    }
                }
                connection.query(sql3, function(err, orderContainsItem) {
                    var sql4 = "INSERT INTO `payment pays order` (`Payment ID`, `Order Number`) VALUES ('"+ paymentID+ "', '"+orderID+"')";
                    connection.query(sql4, function(err, orderContainsItem) {
                        connection.release();
                        if (err) {
                            console.log(err);
                            callback(true);
                            return;
                        }
                        callback(false, orderID);
                    });
                });
            });
        });
    });
}

//2. clear shopping cart contains items。
exports.clearShoppingCart = function(shoppingCartID, callback){
    var sql = "DELETE FROM `shopping cart contains items` WHERE `shoppingCart Id` = " + shoppingCartID;
    pool.getConnection(function(err, connection) {
        if(err) { console.log(err); callback(true); return; }
        connection.query(sql, function(err, results) {
            connection.release();
            if(err) { console.log(err); callback(true); return; }
            callback(false, results);
        });
    });
}

//4. insert shipment，employee ships shipment, order has shipment。
exports.updateShipments = function(req, orderID, shipmentType, date, callback){
    pool.getConnection(function(err, connection) {
        if(err) { console.log(err); callback(true); return; }
        var trackingNumber= '';
        var characters= 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < 22; i++ ) {
            trackingNumber += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        var shipmentPrice=0;
        switch (shipmentType) {
            case 'one-day':
                shipmentPrice = 25.88;
                break;
            case 'two-day':
                shipmentPrice = 15.66;
                break;
            case 'three-day':
                shipmentPrice = 6.77;
                break;
            default:
        }

        var sql1 = "INSERT INTO `bidong`.`shipment` (`Tracking Number`,`Details`,`Street Address Line 1`,`Street Address Line 2`,`City`,`State/Province/Region`,`Country`,`Zip Code`,`Charge`) VALUES ('" +
            trackingNumber +"','"+ shipmentType+ "','"+ req.body.address+"','"+ req.body.address2+"','"+req.body.city +"','"+req.body.state+"','"+req.body.country+"','"+req.body.zip+"','"+shipmentPrice+ "')";
        connection.query(sql1, function(err, shipment) {
            var sql2 = "INSERT INTO `order has shipment`(`Order ID`, `Tracking Number`) VALUES ('"+ orderID+"', '"+trackingNumber+"')";
            connection.query(sql2, function(err, orderHasShipment) {
                var sql3 = "SELECT `Employee ID` FROM `employee` ORDER BY RAND () LIMIT 1";
                connection.query(sql3, function(err, randomEmployee) {
                    var sql4 = "INSERT INTO `bidong`.`employee ships shipment` (`Employee ID`, `Tracking Number`, `Date`) VALUES ('" +
                        randomEmployee[0]['Employee ID']+"', '"+trackingNumber+"', '"+date+"')";
                    connection.query(sql4, function(err, employeeHandlesShipment) {
                        connection.release();
                        if (err) {
                            console.log(err);
                            callback(true);
                            return;
                        }
                        callback(false, trackingNumber);
                    });
                });
            });
        });
    });
}
//5. warehouse has item --
exports.updateWarehouse = function(itemsInShoppingCart, callback){
    pool.getConnection(function(err, connection) {
        if(err) { console.log(err); callback(true); return; }
        var sql = "";
        var boolean = true;
        for (var i = 0; i < itemsInShoppingCart.length; i++) {
            var ItemID = itemsInShoppingCart[i]['ItemID'];
            var quantity = itemsInShoppingCart[i]['quantity'];
            var warehouseQuantity = itemsInShoppingCart[i]['Quantity'];
            var newQuantity = parseInt(warehouseQuantity,10) - parseInt(quantity,10);
            if(newQuantity>0){  //If there are still items in the warehouse.
                sql = "UPDATE `warehouse has item` SET `Quantity` = '"+newQuantity +"' WHERE `Item ID` = '"+ ItemID +"'; ";
            }
            else if (newQuantity == 0){
                sql = "DELETE FROM `warehouse has item` WHERE `Item ID` = '"+ ItemID+"'; ";
            }
            else{
                boolean = false;
                break;
            }
            connection.query(sql);
        }
            connection.release();
            callback(false, boolean);
    });
}

exports.removePayment = function(paymentId){
    var sql = "DELETE FROM `customer saves payment` WHERE `PaymentId` = " + paymentId;
    pool.getConnection(function(err, connection) {
        if(err) { console.log(err); callback(true); return; }
        connection.query(sql, function(err, results) {
            connection.release();
            if(err) { console.log(err); callback(true); return; }
        });
    });
}
exports.addPayment = function(req, callback){
    var sql1 = "INSERT INTO `bidong`.`payment` (`Credit Card Number`,`Expiry Date`,`Payment Type`,`CardHolder's Firstname`,`CardHolder's Lastname`,`Street Address Line 1`,`Street Address Line 2`,`City`,`State/Province/Region`,`Country`,`Zip Code`) VALUES " +
        "('"+req.body.number+"','"+req.body.expiration+"','"+req.body.paymentMethod+"','"+req.body.firstName+"','"+req.body.lastName+"','"+
        req.body.address+"','"+ req.body.address2+"','"+req.body.city +"','"+req.body.state+"','"+req.body.country+"','"+req.body.zip+"')";
    pool.getConnection(function(err, connection) {
        if(err) { console.log(err); callback(true); return; }
        connection.query(sql1, function(err, results) {
            var paymentId = results.insertId;
            var sql2 = "INSERT INTO `bidong`.`customer saves payment` (`CustomerId`, `PaymentId`) VALUES ('" +
                req.user+"','"+paymentId+"')";
            connection.query(sql2, function(err, results) {
                connection.release();
                if(err) { console.log(err); callback(true); return; }
                callback(false, results);
            });
        });
    });
}


exports.getItemFromAnOrder = function(orderID,count, callback){
    var sql1 = "SELECT * FROM (SELECT * FROM `item` WHERE `ItemID` IN (SELECT `Item ID` FROM `order contains item` " +
        "WHERE `order contains item`.`Order ID` = '"+orderID+"'))tbs " +
        "INNER JOIN `order contains item` ON `tbs`.ItemID = `order contains item`.`Item ID` " +
        "WHERE `order contains item`.`Order ID` = '"+orderID+"'";
    pool.getConnection(function(err, connection) {
        if(err) { console.log(err); callback(true); return; }
        connection.query(sql1, function(err, results) {
            connection.release();
            if (err) {
                console.log(err);
                callback(true);
                return;
            }
            callback(false, results, count);
        });
    });
}

exports.getOrderHistory = function(userId, callback){
    var sql1 = "SELECT `ShoppingCart Id` FROM `customer owns shopping cart` WHERE `Customer Id` = " + userId;
    pool.getConnection(function(err, connection) {
        if(err) { console.log(err); callback(true); return; }
        connection.query(sql1, function(err, results) {
            var sql2 = "Select * From `checkout`" +
                " INNER JOIN `order` On `checkout`.`order number` = `order`.`order number`" +
                " INNER JOIN `order has shipment` ON `order has shipment`.`Order ID` = `checkout`.`order number`"+
                " WHERE `checkout`.`shoppingCart ID` = " + results[0]['ShoppingCart Id']+
                " ORDER BY `checkout`.`order number` DESC";
            connection.query(sql2, function(err, orderDetail) {
                connection.release();
                if (err) {
                    console.log(err);
                    callback(true);
                    return;
                }
                callback(false, orderDetail);
            });
        });
    });
}


exports.getItemByID = function(id, callback) {
    var sql = "SELECT * FROM `item` INNER JOIN `seller supplies item`"+
        " ON `seller supplies item`.`Item ID` = `item`.`ItemID`"+
        " INNER JOIN `seller` On `seller supplies item`.`Seller ID` = `seller`.`SellerID`"+
        " INNER JOIN `item has review` On `item`.`ItemID` = `item has review`.`Item ID`"+
        " INNER JOIN `item review write by` On `item review write by`.`Article ID` = `item has review`.`Article ID`"+
        " INNER JOIN `item review` On `item review`.`Item Article ID` = `item has review`.`Article ID` WHERE `item`.`ItemID`="+id;
    pool.getConnection(function(err, connection) {
        if(err) { console.log(err); callback(true); return; }
        connection.query(sql, function(err, results) {
            var copyResults = results;
            var sql2 = "SELECT *,`item`.`Description` FROM `item` INNER JOIN `seller supplies item`"+
                " ON `seller supplies item`.`Item ID` = `item`.`ItemID`"+
                " INNER JOIN `seller` On `seller supplies item`.`Seller ID` = `seller`.`SellerID`"+
                " INNER JOIN `warehouse has item` On `warehouse has item`.`Item ID` = `item`.`ItemID`"+
                " LEFT OUTER JOIN `item has review` On `item`.`ItemID` = `item has review`.`Item ID`"+
                " LEFT OUTER JOIN `item review write by` On `item review write by`.`Article ID` = `item has review`.`Article ID`"+
                " LEFT OUTER JOIN `item review` On `item review`.`Item Article ID` = `item has review`.`Article ID`"+
                " LEFT OUTER JOIN `user` On `user`.`UserID` = `item review write by`.`Customer ID` WHERE `item`.`ItemID`="+id;
            connection.query(sql2, function(err, results) {
                console.log(results);
                var copyResults2 = results;
                var sql3 = "SELECT `item`.`ItemID`,AVG(`item review`.`Rating`) AS CumRate, COUNT(`item review`.`Rating`) AS numOfReview FROM `item` INNER JOIN `seller supplies item`"+
                    " ON `seller supplies item`.`Item ID` = `item`.`ItemID`"+
                    " INNER JOIN `seller` On `seller supplies item`.`Seller ID` = `seller`.`SellerID`"+
                    " LEFT OUTER JOIN `item has review` On `item`.`ItemID` = `item has review`.`Item ID`"+
                    " LEFT OUTER JOIN `item review write by` On `item review write by`.`Article ID` = `item has review`.`Article ID`"+
                    " LEFT OUTER JOIN `item review` On `item review`.`Item Article ID` = `item has review`.`Article ID`"+
                    " LEFT OUTER JOIN `user` On `user`.`UserID` = `item review write by`.`Customer ID` WHERE `item`.`ItemID`="+id+
                    " GROUP BY `item`.`ItemID`";
                connection.query(sql3, function(err, results) {
                    connection.release();
                    if(err) { console.log(err); callback(true); return; }
                    callback(false, copyResults, copyResults2, results);
                });
            });
        });
    });
};

//sql.editItemReview(req.params.id, req.user, req.body.rating,req.body.detail,date);
exports.editItemReview = function(itemID,userID, rating, detail, newdate, callback){
    var sql1 = "INSERT INTO `item review`(`Rating`,`Detail`) VALUES ('"+rating+"','"+detail+"')";
    pool.getConnection(function(err, connection) {
        if(err) { console.log(err); callback(true); return; }
        connection.query(sql1, function(err, result) {
            var articleID = result.insertId;
            var sql2 = "INSERT INTO `Item has review`(`Article ID`,`Item ID`) VALUES ('"+articleID+"','"+itemID+"')";
            connection.query(sql2, function (err, results) {
                var sql3 = "INSERT INTO `item review write by`(`Write Date`, `Article ID`, `Customer ID`) VALUES ('"+newdate+"','"+articleID+"','"+userID+"')";
                connection.query(sql3, function (err, results) {
                    connection.release();
                    if (err) {
                        console.log(err);return;
                    }
                });
            });

        });
    });
};

exports.addToShoppingCart = function(itemID,userID, quantity, callback){
    var sql1 = "SELECT `ShoppingCart Id` FROM `customer owns shopping cart` WHERE `customer owns shopping cart`.`Customer Id`="+userID;
    pool.getConnection(function(err, connection) {
        if(err) { console.log(err); callback(true); return; }
        connection.query(sql1, function(err, result) {
            var SCID = result[0]['ShoppingCart Id'];
            var sql2 = "SELECT * FROM `shopping cart contains items` WHERE `shopping cart contains items`.`shoppingCart Id`="+SCID+" AND `shopping cart contains items`.`ItemID`="+itemID;
            connection.query(sql2, function (err, results) {
                if(results[0]===undefined) //shopping cart doesn't contain item
                    var sql3 = "INSERT INTO `shopping cart contains items`(`shoppingCart Id`, `quantity`, `ItemID`) VALUES ('"+SCID+"','"+quantity+"','"+itemID+"')";
                else {
                    var sql3 = 'UPDATE `shopping cart contains items` ' +
                        'SET `quantity` = \'' + results[0]['quantity'] + '\'+\'' + quantity + '\'' +
                        ' WHERE `shopping cart contains items`.`shoppingCart Id`=' + SCID + ' AND `shopping cart contains items`.`ItemID`=' + itemID;
                }
                connection.query(sql3, function (err, results) {
                    connection.release();
                    if (err) {
                        console.log(err);return;
                    }
                });
            });

        });
    });
};
exports.getOrderDetail = function(orderID, callback){
    var sql1 ="Select * From `checkout`" +
        " INNER JOIN `order` On `checkout`.`order number` = `order`.`order number`" +
        " INNER JOIN `order has shipment` ON `order has shipment`.`Order ID` = `checkout`.`order number`"+
        " INNER JOIN `shipment` ON `shipment`.`Tracking Number` = `order has shipment`.`Tracking Number`"+
        " INNER JOIN `order contains item` ON `order contains item`.`Order ID` = `checkout`.`order number`"+
        " INNER JOIN `item` ON `item`.`ItemID` = `order contains item`.`Item ID`"+
        " WHERE `checkout`.`order number` = " + orderID ;
   pool.getConnection(function(err, connection) {
       if (err) {console.log(err);callback(true);return;}
       connection.query(sql1, function (err, shipmentDetail) {
           var sql2 = "Select * From `payment`" +
               " INNER JOIN `payment pays order` On `payment`.`PaymentId` = `payment pays order`.`Payment ID`" +
               " WHERE `payment pays order`.`Order Number` = " + orderID;
           connection.query(sql2, function (err, paymentDetail) {
               connection.release();
               if (err) {
                   console.log(err);
                   callback(true);
                   return;
               }
               callback(false, shipmentDetail, paymentDetail);
           });
       });
   });
};

exports.getItemByType = function(category, callback) {
    var sql = "SELECT `item`.`ItemID`,`item`.`Item Name`,`item`.`Price`,AVG(`item review`.`Rating`) AS CumRate, COUNT(`item review`.`Rating`) AS numOfReview FROM `item`"+
        " INNER JOIN `warehouse has item` On `warehouse has item`.`Item ID` = `item`.`ItemID`"+
        " LEFT OUTER JOIN `item has review` On `item`.`ItemID` = `item has review`.`Item ID`"+
        " LEFT OUTER JOIN `item review` On `item review`.`Item Article ID` = `item has review`.`Article ID` ";
    if(category !== 'all')
        sql += " WHERE `item`.`Type`="+ "'"+category+"'";
    sql += " GROUP BY `item`.`ItemID`";
    pool.getConnection(function(err, connection) {
        if(err) { console.log(err); callback(true); return; }
        connection.query(sql, function(err, results) {
                connection.release();
                if(err) { console.log(err); callback(true); return; }
                callback(false, results);
        });
    });
};

exports.sortItemHighToLow = function(category, callback) {
    var sql = "SELECT `item`.`ItemID`,`item`.`Item Name`,`item`.`Price`,AVG(`item review`.`Rating`) AS CumRate, COUNT(`item review`.`Rating`) AS numOfReview FROM `item`"+
        " INNER JOIN `warehouse has item` On `warehouse has item`.`Item ID` = `item`.`ItemID`"+
        " LEFT OUTER JOIN `item has review` On `item`.`ItemID` = `item has review`.`Item ID`"+
        " LEFT OUTER JOIN `item review` On `item review`.`Item Article ID` = `item has review`.`Article ID`";
    if(category !== 'all')
        sql += " WHERE `item`.`Type`="+ "'"+category+"'";
    sql += " GROUP BY `item`.`ItemID` ORDER BY `item`.`Price` DESC";
    pool.getConnection(function(err, connection) {
        if(err) { console.log(err); callback(true); return; }
        connection.query(sql, function(err, results) {
            connection.release();
            if(err) { console.log(err); callback(true); return; }
            callback(false, results);
        });
    });
};

exports.sortItemLowToHigh = function(category, callback) {
    var sql = "SELECT `item`.`ItemID`,`item`.`Item Name`,`item`.`Price`,AVG(`item review`.`Rating`) AS CumRate, COUNT(`item review`.`Rating`) AS numOfReview FROM `item`"+
        " INNER JOIN `warehouse has item` On `warehouse has item`.`Item ID` = `item`.`ItemID`"+
        " LEFT OUTER JOIN `item has review` On `item`.`ItemID` = `item has review`.`Item ID`"+
        " LEFT OUTER JOIN `item review` On `item review`.`Item Article ID` = `item has review`.`Article ID`";
        if(category !== 'all')
            sql += " WHERE `item`.`Type`="+ "'"+category+"'";
        sql += " GROUP BY `item`.`ItemID` ORDER BY `item`.`Price` ASC";
    pool.getConnection(function(err, connection) {
        if(err) { console.log(err); callback(true); return; }
        connection.query(sql, function(err, results) {
            connection.release();
            if(err) { console.log(err); callback(true); return; }
            callback(false, results);
        });
    });
};

exports.sortItemReview = function(category, callback) {
    var sql = "SELECT `item`.`ItemID`,`item`.`Item Name`,`item`.`Price`,AVG(`item review`.`Rating`) AS CumRate, COUNT(`item review`.`Rating`) AS numOfReview FROM `item`"+
        " INNER JOIN `warehouse has item` On `warehouse has item`.`Item ID` = `item`.`ItemID`"+
        " LEFT OUTER JOIN `item has review` On `item`.`ItemID` = `item has review`.`Item ID`"+
        " LEFT OUTER JOIN `item review` On `item review`.`Item Article ID` = `item has review`.`Article ID` ";
    if(category !== 'all')
        sql += " WHERE `item`.`Type`="+ "'"+category+"'";
    sql += " GROUP BY `item`.`ItemID` ORDER BY `CumRate` DESC, `numOfReview` DESC";
    pool.getConnection(function(err, connection) {
        if(err) { console.log(err); callback(true); return; }
        connection.query(sql, function(err, results) {
            connection.release();
            if(err) { console.log(err); callback(true); return; }
            callback(false, results);
        });
    });
};

exports.getSellerForPage = function(id, callback) {
    var sql = "SELECT * FROM `seller`"+
        "INNER JOIN `seller supplies item` ON `seller`.`SellerID` = `seller supplies item`.`Seller ID` WHERE `SellerID` =" + id;
    // get a connection from the pool
    pool.getConnection(function(err, connection) {
        if(err) { console.log(err); callback(true); return; }
        connection.query(sql, function(err, results) {
            var checkItem = results;
            var sql2 = "SELECT * FROM `seller`"+
                "INNER JOIN `Seller has review` ON `Seller has review`.`Seller ID` = `seller`.`SellerID` WHERE `SellerID` =" + id;
            connection.query(sql2, function(err, results) {
                var checkReview = results;
                var sql3 = "SELECT * FROM `seller`"+
                    "LEFT OUTER JOIN `Seller has review` ON `Seller has review`.`Seller ID` = `seller`.`SellerID`"+
                    "LEFT OUTER JOIN `seller review` ON `Seller has review`.`Article ID` = `seller review`.`Seller Article ID`"+
                    "LEFT OUTER JOIN `seller review write by` ON `seller review write by`.`Article ID` = `seller review`.`Seller Article ID`"+
                    "LEFT OUTER JOIN `user` ON `seller review write by`.`Customer ID` = `user`.`UserID` WHERE `SellerID` =" + "'"+id+"'";
                connection.query(sql3, function(err, results) {
                    var reviewResult = results;
                    var sql4 = "SELECT * FROM `seller`"+
                        "INNER JOIN `seller supplies item` ON `seller`.`SellerID` = `seller supplies item`.`Seller ID`"+
                        "INNER JOIN `user` ON `user`.`UserID` = `seller`.`SellerID` "+
                        "INNER JOIN `item` ON `item`.`ItemID` = `seller supplies item`.`Item ID` WHERE `SellerID` =" + id;
                    connection.query(sql4, function(err, results) {
                        var itemResult = results;
                        var sql5 = "SELECT * FROM `seller`"+
                            "INNER JOIN `user` ON `seller`.`SellerID` = `user`.`UserID` WHERE `SellerID` =" + id;
                        connection.query(sql5, function(err, results) {
                            var userInfo = results;
                            var sql6 = "SELECT `seller`.`SellerID`,AVG(`seller review`.`Rating`) AS CumRate, COUNT(`seller review`.`Rating`) AS numOfReview FROM `seller`"+
                                "LEFT OUTER JOIN `Seller has review` ON `Seller has review`.`Seller ID` = `seller`.`SellerID`"+
                                "LEFT OUTER JOIN `seller review` ON `Seller has review`.`Article ID` = `seller review`.`Seller Article ID`"+
                                "LEFT OUTER JOIN `seller review write by` ON `seller review write by`.`Article ID` = `seller review`.`Seller Article ID`"+
                                "LEFT OUTER JOIN `user` ON `seller review write by`.`Customer ID` = `user`.`UserID` WHERE `SellerID` =" + "'"+id+"'"+
                                "GROUP BY `seller`.`SellerID`";
                            connection.query(sql6, function(err, results) {
                                var AvgInfo = results;
                                connection.release();
                                if(err) { console.log(err); callback(true); return; }
                                callback(false, checkItem, checkReview, reviewResult, itemResult, userInfo, AvgInfo);
                            });
                        });
                    });
                });
            });
        });
    });
};


exports.editSellerReview = function(sellerID,userID, rating, detail, newdate, callback){
    var sql1 = "INSERT INTO `seller review`(`Rating`,`Detail`) VALUES ('"+rating+"','"+detail+"')";
    pool.getConnection(function(err, connection) {
        if(err) { console.log(err); callback(true); return; }
        connection.query(sql1, function(err, result) {
            var articleID = result.insertId;
            var sql2 = "INSERT INTO `seller has review`(`Article ID`,`Seller ID`) VALUES ('"+articleID+"','"+sellerID+"')";
            connection.query(sql2, function (err, results) {
                var sql3 = "INSERT INTO `seller review write by`(`Write Date`, `Article ID`, `Customer ID`) VALUES ('"+newdate+"','"+articleID+"','"+userID+"')";
                connection.query(sql3, function (err, results) {
                    connection.release();
                    if (err) {
                        console.log(err);return;
                    }
                });
            });

        });
    });
};

exports.getAllSellers = function(callback) {
    var sql = "SELECT * FROM `seller` INNER JOIN `user` ON `seller`.`SellerID` = `user`.`UserID` ORDER BY `user`.`Username` ASC";
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

exports.getRefundHistory = function(userId, callback){
    var sql = "Select * From `refund`" +
        " WHERE `refund`.`Customer ID` = " + userId+
        " ORDER BY `refund`.`Order ID` DESC";
    pool.getConnection(function(err, connection) {
        if(err) { console.log(err); callback(true); return; }
        connection.query(sql, function(err, results) {
                connection.release();
                if (err) {
                    console.log(err);
                    callback(true);
                    return;
                }
                callback(false, results);
        });
    });
}

exports.getItemFromAnRefund = function(refundID,count, callback){
    var sql1 = "SELECT * FROM `item` " +
        "INNER JOIN `refund contains items` ON `refund contains items`.`Item ID` = `item`.`ItemID` " +
        "WHERE `refund contains items`.`Refund ID` = '"+refundID+"'";;
    pool.getConnection(function(err, connection) {
        if(err) { console.log(err); callback(true); return; }
        connection.query(sql1, function(err, results) {
            connection.release();
            if (err) {
                console.log(err);
                callback(true);
                return;
            }
            callback(false, results, count);
        });
    });
}

//sql.getReturnInfoByOrder(req.user, req.params.order, function (err, results) {
exports.getReturnInfoByOrder = function(userID,orderID, callback) {
    var sql = "SELECT * FROM `order contains item` INNER JOIN `item` ON `item`.`ItemID` = `order contains item`.`Item ID` WHERE `order contains item`.`Order ID`="+"'"+orderID+"' AND `Quantity` >0";
    pool.getConnection(function(err, connection) {
        if(err) { console.log(err); callback(true); return; }
        connection.query(sql, function(err, results) {
            connection.release();
            if(err) { console.log(err); callback(true); return; }
            callback(false, results);
        });
    });
};

exports.addToRefundContainsItem = function(itemID,quantity,newQuantity,order,callback) {
    console.log("new quantity: "+newQuantity);
    var sql = "INSERT INTO `refund contains items`(`Item ID`,`Quantity`) VALUES ('"+itemID+"','"+quantity+"')";
    pool.getConnection(function(err, connection) {
        if(err) { console.log(err); callback(true); return; }
        connection.query(sql, function(err, results) {
            var sql2 = "UPDATE `order contains item` SET `Quantity` = '"+newQuantity +"' WHERE `Item ID` = '"+ itemID +"' AND `Order ID` = '"+order+"'; ";
            connection.query(sql2, function(err, results) {
                connection.release();
                if(err) { console.log(err);}
            });
        });
    });
};
//`refund` (`Customer ID`, `Order ID`, `Refund Way`, `Refund Price`, `Refund Reason`)
exports.addToRefund = function(user, order, return_way, return_price, reason, sql2, callback) {
    var sql = "INSERT INTO `refund` (`Customer ID`, `Order ID`, `Refund Way`, `Refund Price`, `Refund Reason`)  " +
        "VALUES ('"+user+"','"+order+"','"+return_way+"','"+return_price+"','"+ reason+"')";
    pool.getConnection(function(err, connection) {
        if(err) { console.log(err); callback(true); return; }
        connection.query(sql, function(err, results) {
            connection.query(sql2, function(err, results) {
                connection.release();
                if (err) {
                    console.log(err);
                }
                callback(false);
            });
        });
    });
};

exports.searchAllItem = function(keyword, callback) {
    var words = keyword.split(" ");
    var sql = "SELECT `item`.`ItemID`,`item`.`Item Name`,`item`.`Price`,AVG(`item review`.`Rating`) AS CumRate, COUNT(`item review`.`Rating`) AS numOfReview FROM `item`"+
        " INNER JOIN `warehouse has item` On `warehouse has item`.`Item ID` = `item`.`ItemID`"+
        " LEFT OUTER JOIN `item has review` On `item`.`ItemID` = `item has review`.`Item ID`"+
        " LEFT OUTER JOIN `item review` On `item review`.`Item Article ID` = `item has review`.`Article ID`" +
        " WHERE ";
        for(var i in words){
            sql+="`item`.`Item Name` LIKE '%"+words[i]+"%' OR `item`.`Description` LIKE '%"+words[i]+"%' OR ";
        }
        sql = sql.substring(0,sql.length-3);
        sql+=" GROUP BY `item`.`ItemID`";
    pool.getConnection(function(err, connection) {
        if(err) { console.log(err); callback(true); return; }
        connection.query(sql, function(err, results) {
            console.log(results);
            connection.release();
            if(err) { console.log(err); callback(true); return; }
            callback(false, results);
        });
    });
};




