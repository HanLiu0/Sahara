CREATE TABLE `bidong`.`user` (
  `UserID` INT(15) ZEROFILL NOT NULL AUTO_INCREMENT,
  `Email Address` VARCHAR(254) NOT NULL,
  `Username` CHAR(20) NOT NULL,
  `Password` CHAR(20) NOT NULL,
  PRIMARY KEY (`UserID`),
  UNIQUE(`Email Address`),
  UNIQUE(`Username`));

CREATE TABLE `bidong`.`customer` (
  `CustomerID` INT(15) ZEROFILL NOT NULL AUTO_INCREMENT,
  `First Name` VARCHAR(20) NOT NULL,
  `Last Name` VARCHAR(20) NOT NULL,
  `Middle Name` VARCHAR(20) NULL,
  `Phone Number` CHAR(10) NULL,
  `Street Address Line 1` VARCHAR(40) NULL,
  `Street Address Line 2` VARCHAR(40) NULL,
  `City` VARCHAR(20) NULL,
  `State/Province/Region` VARCHAR(20) NULL,
  `Country` VARCHAR(20) NULL,
  `Zip Code` CHAR(10) NULL,
  PRIMARY KEY (`CustomerID`),
  CONSTRAINT `UserFK in customer`
    FOREIGN KEY (`CustomerID`) REFERENCES `bidong`.`user` (`UserID`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION
  );

CREATE TABLE `bidong`.`seller` (
  `SellerID` INT(15) ZEROFILL NOT NULL AUTO_INCREMENT,
  `Company Name` VARCHAR(45) NOT NULL,
  `Phone Number` CHAR(10) NULL,
  `Street Address Line 1` VARCHAR(40) NULL,
  `Street Address Line 2` VARCHAR(40) NULL,
  `City` VARCHAR(20) NULL,
  `State/Province/Region` VARCHAR(20) NULL,
  `Country` VARCHAR(20) NULL,
  `Zip Code` CHAR(10) NULL,
  PRIMARY KEY (`SellerID`),
  CONSTRAINT `UserFK in seller`
    FOREIGN KEY (`SellerID`) REFERENCES `bidong`.`user` (`UserID`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION
);

CREATE TABLE `bidong`.`item` (
  `ItemID` INT(15) ZEROFILL NOT NULL AUTO_INCREMENT,
  `Price` DECIMAL(7,2) NOT NULL,
  `Type` VARCHAR(45) NOT NULL,
  `Description` VARCHAR(2000) NULL,
  `Item Name` VARCHAR(200) NOT NULL,
  PRIMARY KEY (`ItemID`));
  
CREATE TABLE `bidong`.`item review` (
  `Item Article ID` INT(15) ZEROFILL NOT NULL AUTO_INCREMENT,
  `Rating` INT(1) NOT NULL,
  `Detail` VARCHAR(2000) NULL,
  PRIMARY KEY (`Item Article ID`));

CREATE TABLE `bidong`.`shopping cart` (
  `ShoppingCart Id` INT(15) ZEROFILL NOT NULL AUTO_INCREMENT,
  `Total Price` DECIMAL(11,2) DEFAULT 0.00,
  PRIMARY KEY (`ShoppingCart Id`));

  CREATE TABLE `bidong`.`order` (
  `order number` INT(15) ZEROFILL NOT NULL AUTO_INCREMENT,
  `order date` DATE NOT NULL,
  `Total price` DECIMAL(11,2) NOT NULL,
  PRIMARY KEY (`order number`));

CREATE TABLE `bidong`.`payment` (
  `PaymentId` INT(15) ZEROFILL NOT NULL AUTO_INCREMENT,
  `Credit Card Number` CHAR(16) NOT NULL,
  `Expiry Date` DATE NOT NULL,
  `Payment Type` CHAR(20) NOT NULL,
  `CardHolder's Firstname` CHAR(20) NOT NULL,
  `CardHolder's Lastname` CHAR(20) NOT NULL,
  `Street Address Line 1` VARCHAR(40) NOT NULL,
  `Street Address Line 2` VARCHAR(40),
  `City` VARCHAR(20) NOT NULL,
  `State/Province/Region` VARCHAR(20) NOT NULL,
  `Country` VARCHAR(20) NOT NULL,
  `Zip Code` CHAR(10) NOT NULL,
  PRIMARY KEY (`PaymentId`));


CREATE TABLE `bidong`.`refund` (
  `Customer ID` INT(15) ZEROFILL NOT NULL,
  `Order ID` INT(15) ZEROFILL NOT NULL,
  `Refund Way` CHAR(20) NOT NULL,
  `Refund Price` DECIMAL(11,2) NOT NULL,
  `Refund Reason` VARCHAR(254) NULL,
  PRIMARY KEY (`Customer ID`, `Order ID`),
  CONSTRAINT `Refund Customer FK`
  FOREIGN KEY (`Customer ID`)
  REFERENCES `bidong`.`customer` (`CustomerID`)
  ON DELETE CASCADE
  ON UPDATE NO ACTION,
  CONSTRAINT `Refund Order FK`
  FOREIGN KEY (`Order ID`)
  REFERENCES `bidong`.`order` (`order number`)
  ON DELETE CASCADE
  ON UPDATE NO ACTION);


CREATE TABLE `bidong`.`shipment` (
  `Tracking Number` CHAR(22) NOT NULL,
  `Details` VARCHAR(000254) NULL,
  `Street Address Line 1` VARCHAR(40) NOT NULL,
  `Street Address Line 2` VARCHAR(40) NULL,
  `City` VARCHAR(20) NOT NULL,
  `State/Province/Region` VARCHAR(20) NOT NULL,
  `Country` VARCHAR(20) NOT NULL,
  `Zip Code` CHAR(10) NOT NULL,
  `Charge` DECIMAL(7,2) NOT NULL,
  PRIMARY KEY (`Tracking Number`));

CREATE TABLE `bidong`.`employee` (
  `Employee ID` INT(15) ZEROFILL NOT NULL AUTO_INCREMENT,
  `Date Join` DATE NULL,
  `Designation/Role` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`Employee ID`));

CREATE TABLE `bidong`.`seller review` (
  `Seller Article ID` INT(15) ZEROFILL NOT NULL AUTO_INCREMENT,
  `Rating` INT(1) NOT NULL,
  `Detail` VARCHAR(2000) NULL,
  PRIMARY KEY (`Seller Article ID`));
  
  CREATE TABLE `bidong`.`warehouse` (
  `Warehouse ID` INT(5) ZEROFILL NOT NULL DEFAULT 11111,
  `Phone Number` CHAR(10) NOT NULL,
  `Street Address Line 1` VARCHAR(40) NOT NULL,
  `Street Address Line 2` VARCHAR(40) NULL,
  `City` VARCHAR(20) NOT NULL,
  `State/Province/Region` VARCHAR(20) NOT NULL,
  `Country` VARCHAR(20) NOT NULL,
  `Zip Code` CHAR(10) NOT NULL,
  PRIMARY KEY (`Warehouse ID`));


CREATE TABLE `bidong`.`customer owns shopping cart` (
  `Customer Id` INT(15) ZEROFILL NOT NULL,
  `ShoppingCart Id` INT(15) ZEROFILL NOT NULL,
  PRIMARY KEY (`Customer Id`, `ShoppingCart Id`),
  CONSTRAINT `CustomerFK in shopping cart`
    FOREIGN KEY (`Customer Id`) 
REFERENCES `bidong`.`customer` (`CustomerID`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `ShoppingFK in shopping cart`
    FOREIGN KEY (`ShoppingCart Id`) 
REFERENCES `bidong`.`shopping cart` (`ShoppingCart Id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION);

CREATE TABLE `bidong`.`customer saves payment` (
  `CustomerId` INT(15) ZEROFILL NOT NULL,
  `PaymentId` INT(15) ZEROFILL NOT NULL,
  PRIMARY KEY (`PaymentId`),
 CONSTRAINT `CustomerFK in Saves`
    FOREIGN KEY (`CustomerId`) REFERENCES `bidong`.`customer` (`CustomerID`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `PaymentFK in Saves`
    FOREIGN KEY (`PaymentId`) REFERENCES `bidong`.`payment` (`PaymentId`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION);

CREATE TABLE `bidong`.`shopping cart contains items` (
  `shoppingCart Id` INT(15) ZEROFILL NOT NULL,
  `quantity` INT(3) NOT NULL,
  `ItemID` INT(15) ZEROFILL NOT NULL,
  PRIMARY KEY (`shoppingCart Id`, `ItemID`),
  CONSTRAINT `shoppingCart in contains`
    FOREIGN KEY (`shoppingCart Id`)
    REFERENCES `bidong`.`shopping cart` (`ShoppingCart Id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `item in contains`
    FOREIGN KEY (`ItemID`)
    REFERENCES `bidong`.`item` (`ItemID`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION);

CREATE TABLE `bidong`.`checkout` (
  `shoppingCart ID` INT(15) ZEROFILL NOT NULL,
  `order number` INT(15) ZEROFILL NOT NULL,
  PRIMARY KEY (`order number`),
  CONSTRAINT `ShoppingCartFK in checkout`
    FOREIGN KEY (`shoppingCart ID`)
    REFERENCES `bidong`.`shopping cart` (`shoppingCart Id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `OrderFK in checkout`
    FOREIGN KEY (`order number`)
    REFERENCES `bidong`.`order` (`order number`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION);


CREATE TABLE `bidong`.`payment pays order` (
  `Payment ID` INT(15) ZEROFILL NOT NULL,
  `Order Number` INT(15) ZEROFILL NOT NULL,
  PRIMARY KEY (`Order Number`),
  CONSTRAINT `orderFK in pay`
    FOREIGN KEY (`order number`)
    REFERENCES `bidong`.`order` (`order number`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `paymentFK in pay`
    FOREIGN KEY (`payment id`)
    REFERENCES `bidong`.`payment` (`paymentId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

CREATE TABLE `bidong`.`order has shipment` (
  `Order ID` INT(15) ZEROFILL NOT NULL,
  `Tracking Number` CHAR(22) NOT NULL,
  PRIMARY KEY (`Order ID`, `Tracking Number`),
CONSTRAINT `Shipment Order ID FK`
  FOREIGN KEY (`Order ID`)
  REFERENCES `bidong`.`order` (`order number`)
  ON DELETE CASCADE
  ON UPDATE NO ACTION,
CONSTRAINT `Shipment Tracking Number FK`
  FOREIGN KEY (`Tracking Number`)
  REFERENCES `bidong`.`shipment` (`Tracking Number`)
  ON DELETE CASCADE
  ON UPDATE NO ACTION);

CREATE TABLE `bidong`.`order contains item` (
  `Order ID` INT(15) ZEROFILL NOT NULL,
  `Item ID` INT(15) ZEROFILL NOT NULL,
  `Quantity` INT NULL,
  PRIMARY KEY (`Order ID`, `Item ID`),
CONSTRAINT `Contains Table Order ID FK`
  FOREIGN KEY (`Order ID`)
  REFERENCES `bidong`.`order` (`order number`)
  ON DELETE CASCADE
  ON UPDATE NO ACTION,
CONSTRAINT `Contains Table Item ID FK`
  FOREIGN KEY (`Item ID`)
  REFERENCES `bidong`.`item` (`ItemID`)
  ON DELETE CASCADE
  ON UPDATE NO ACTION);

CREATE TABLE `bidong`.`item has review` (
  `Article ID` INT(15) ZEROFILL NOT NULL,
  `Item ID` INT(15) ZEROFILL NOT NULL,
PRIMARY KEY (`Article ID`, `Item ID`),
 CONSTRAINT `item has ArticleFK`
    FOREIGN KEY (`Article ID`) REFERENCES `bidong`.`item review` (`Item Article ID`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `item has ItemFK`
    FOREIGN KEY (`Item ID`) REFERENCES `bidong`.`item` (`ItemID`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION);


CREATE TABLE `bidong`.`item review write by` (
  `Write Date` DATE NOT NULL,
  `Article ID` INT(15) ZEROFILL NOT NULL,
  `Customer ID` INT(15) ZEROFILL NOT NULL,
PRIMARY KEY (`Article ID`, `Customer ID`),
 CONSTRAINT `item write by ArticleFK`
    FOREIGN KEY (`Article ID`) REFERENCES `bidong`.`item review` (`Item Article ID`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `item write by CustomerFK`
    FOREIGN KEY (`Customer ID`) REFERENCES `bidong`.`customer` (`CustomerID`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION);

CREATE TABLE `bidong`.`seller review write by` (
  `Write Date` DATE NOT NULL,
  `Article ID` INT(15) ZEROFILL NOT NULL,
  `Customer ID` INT(15) ZEROFILL NOT NULL,
PRIMARY KEY (`Article ID`, `Customer ID`),
 CONSTRAINT `seller write by ArticleFK`
    FOREIGN KEY (`Article ID`) REFERENCES `bidong`.`seller review` (`Seller Article ID`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `seller write by CustomerFK`
    FOREIGN KEY (`Customer ID`) REFERENCES `bidong`.`customer` (`CustomerID`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION);


CREATE TABLE `bidong`.`employee reports to` (
  `Supervisor ID` INT(15) ZEROFILL NOT NULL,
  `Employee ID` INT(15) ZEROFILL NOT NULL,
  PRIMARY KEY (`Supervisor ID`, `Employee ID`),
  CONSTRAINT `EmployeeFK`
    FOREIGN KEY (`Supervisor ID`)
    REFERENCES `bidong`.`employee` (`Employee ID`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `SupervisorFK`
    FOREIGN KEY (`Employee ID`)
    REFERENCES `bidong`.`employee` (`Employee ID`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION);


CREATE TABLE `bidong`.`employee ships shipment` (
  `Employee ID` INT(15) ZEROFILL NOT NULL,
  `Tracking Number` CHAR(22) NOT NULL,
  `Date` CHAR(10) NULL,
  PRIMARY KEY (`Employee ID`, `Tracking Number`),
  CONSTRAINT `EmployeeFK in Ships`
    FOREIGN KEY (`Employee ID`)
    REFERENCES `bidong`.`employee` (`Employee ID`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `Tracking Number FK in Ships`
    FOREIGN KEY (`Tracking Number`)
    REFERENCES `bidong`.`shipment` (`Tracking Number`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION);

CREATE TABLE `bidong`.`warehouse has item` (
  `Item ID` INT(15) ZEROFILL NOT NULL,
  `Warehouse ID` INT(15) ZEROFILL NOT NULL,
  `Quantity` INT(3) ZEROFILL NOT NULL,
PRIMARY KEY (`Item ID`, `Warehouse ID`),
 CONSTRAINT `warehouse has itemFK`
    FOREIGN KEY (`Item ID`) REFERENCES `bidong`.`item` (`ItemID`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `warehouse has warehouseFK`
    FOREIGN KEY (`Warehouse ID`) REFERENCES `bidong`.`warehouse` (`Warehouse ID`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION);

CREATE TABLE `bidong`.`seller supplies item` (
  `Item ID` INT(15) ZEROFILL NOT NULL,
  `Warehouse ID` INT(15) ZEROFILL NOT NULL,
  `Seller ID` INT(15) ZEROFILL NOT NULL,
PRIMARY KEY (`Item ID`, `Warehouse ID`, `Seller ID`),
 CONSTRAINT `supplies itemFK`
    FOREIGN KEY (`Item ID`) REFERENCES `bidong`.`item` (`ItemID`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `supplies warehouseFK`
    FOREIGN KEY (`Warehouse ID`) REFERENCES `bidong`.`warehouse` (`Warehouse ID`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
CONSTRAINT `supplies sellerFK`
    FOREIGN KEY (`Seller ID`) REFERENCES `bidong`.`seller` (`SellerID`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION);
    
    
CREATE TABLE `bidong`.`seller has review` (
  `Article ID` INT(15) ZEROFILL NOT NULL,
  `Seller ID` INT(15) ZEROFILL NOT NULL,
PRIMARY KEY (`Article ID`, `Seller ID`),
 CONSTRAINT `item has SellerArticleFK`
    FOREIGN KEY (`Article ID`) REFERENCES `bidong`.`seller review` (`Seller Article ID`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `item has SellerFK`
    FOREIGN KEY (`Seller ID`) REFERENCES `bidong`.`seller` (`SellerID`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION);

CREATE TABLE `bidong`.`refund contains items` (
  `Refund ID` INT ZEROFILL NOT NULL,
  `Item ID` INT(15) ZEROFILL NOT NULL,
  `Quantity` INT NULL,
  PRIMARY KEY (`Refund ID`, `Item ID`),
  CONSTRAINT `Refund Items ID FK`
  FOREIGN KEY (`Item ID`)
  REFERENCES `bidong`.`item` (`ItemID`)
  ON DELETE CASCADE
  ON UPDATE NO ACTION,
  CONSTRAINT `Refund ID FK`
  FOREIGN KEY (`Refund ID`)
  REFERENCES `bidong`.`refund` (`Order ID`)
  ON DELETE CASCADE
  ON UPDATE NO ACTION);

delimiter //
CREATE TRIGGER `bidong`.`computeTotalPriceInShoppingCartWhenINSERT` AFTER INSERT
ON `bidong`.`shopping cart contains items` FOR EACH ROW
    BEGIN
           SET @amount=( SELECT `Price` FROM `item` WHERE (ItemID=NEW.ItemID));
    
           UPDATE `bidong`.`shopping cart`
           SET `bidong`.`shopping cart`.`Total Price` = `bidong`.`shopping cart`.`Total Price` + @amount * NEW.`quantity`
           WHERE `bidong`.`shopping cart`.`ShoppingCart Id` = NEW.`shoppingCart Id`;
	END;//
delimiter ;

delimiter //
CREATE TRIGGER `bidong`.`computeTotalPriceInShoppingCartWhenDELECT` AFTER DELETE
    ON `bidong`.`shopping cart contains items` FOR EACH ROW
BEGIN
    SET @amount=( SELECT `Price` FROM `item` WHERE (ItemID=OLD.ItemID));

    UPDATE `bidong`.`shopping cart`
    SET `bidong`.`shopping cart`.`Total Price` = `bidong`.`shopping cart`.`Total Price` - @amount * OLD.`quantity`
    WHERE `bidong`.`shopping cart`.`ShoppingCart Id` = OLD.`shoppingCart Id`;
END;//
delimiter ;

delimiter //
CREATE TRIGGER `bidong`.`computeTotalPriceInShoppingCartWhenUPDATE` AFTER UPDATE
    ON `bidong`.`shopping cart contains items` FOR EACH ROW
BEGIN
    SET @amount=( SELECT `Price` FROM `item` WHERE (ItemID=NEW.ItemID));
    IF NEW.`quantity`> OLD.`quantity` THEN
        UPDATE `bidong`.`shopping cart` SET `bidong`.`shopping cart`.`Total Price` = `bidong`.`shopping cart`.`Total Price` + @amount*(NEW.`quantity`- OLD.`quantity`)
        WHERE `bidong`.`shopping cart`.`ShoppingCart Id` = NEW.`shoppingCart Id`;
    ELSE
        UPDATE `bidong`.`shopping cart` SET `bidong`.`shopping cart`.`Total Price` = `bidong`.`shopping cart`.`Total Price` - @amount*(OLD.`quantity`- NEW.`quantity`)
        WHERE `bidong`.`shopping cart`.`ShoppingCart Id` = NEW.`shoppingCart Id`;
    END IF;
END;//
delimiter ;