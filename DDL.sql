-- Created by Peter & Katheryn in group 21

SET FOREIGN_KEY_CHECKS=0;
SET AUTOCOMMIT = 0;

-- Customers table holds all information related to our customers account which is required for the safety of the animals
CREATE OR REPLACE TABLE Customers(
    customerID int AUTO_INCREMENT UNIQUE NOT NULL,
    name varchar(100) NOT NULL,
    email varchar(100) NOT NULL,
    phone varchar(15) NULL,
    PRIMARY KEY(customerID)
);

-- Admissions is our record of the admissions we had for each user, how long their ticket they purchased was and the cost of the admission
CREATE OR REPLACE TABLE Admissions(
    admissionID int AUTO_INCREMENT UNIQUE NOT NULL,
    customerID int NOT NULL,
    admissionDate datetime NOT NULL,
    duration int NOT NULL,
    fee decimal NOT NULL,
    PRIMARY KEY(admissionID),
    FOREIGN KEY(customerID) REFERENCES Customers(customerID)
);

-- stores every product we have related to the consumables and merch
CREATE OR REPLACE TABLE ProductInventory(
    productID int AUTO_INCREMENT UNIQUE NOT NULL,
    productName varChar(100) NOT NULL,
    price decimal NOT NULL,
    productCategory varChar(100) NOT NULL,
    PRIMARY KEY(productID)
);

-- stores the total cost of a transaction for a user
CREATE OR REPLACE TABLE Purchases(
    purchaseID int auto_increment unique not NULL,
    customerID int not NULL,
    purchaseDate datetime not NULL,
    purchaseCost decimal not NULL,
    PRIMARY KEY(purchaseID),
    FOREIGN KEY(customerID) REFERENCES Customers(customerID),
);

-- An intersection table between Purchases and ProductInventory to store the items purchased and in which purchase they were sold
CREATE OR REPLACE TABLE ProductPurchases(
    productPurchaseID int AUTO_INCREMENT UNIQUE NOT NULL,
    productID int NOT NULL,
    purchaseID int NOT NULL,
    PRIMARY KEY(productPurchaseID),
    FOREIGN KEY(productID) REFERENCES ProductInventory(productID),
    FOREIGN KEY(purchaseID) REFERENCES Purchases(purchaseID)
);

-- A table for our cats with updates about their information for customers
CREATE OR REPLACE TABLE Cats(
    catID int AUTO_INCREMENT UNIQUE NOT NULL,
    catName varChar(50) NOT NULL,
    catDescription varChar(255),
    age int NULL,
    breed varChar(50) NOT NULL,
    adopted boolean default FALSE,
    PRIMARY KEY(catID)
);

-- A table storing data about adoptions made and by who for which cat(s)
CREATE OR REPLACE TABLE Adoptions(
    adoptionID int AUTO_INCREMENT UNIQUE NOT NULL,
    customerID int NOT NULL,
    catID int NOT NULL,
    adoptionDate datetime NOT NULL,
    adoptionFee decimal NOT NULL,
    PRIMARY KEY(adoptionID),
    FOREIGN KEY(customerID) REFERENCES Customers(customerID)
);



SET FOREIGN_KEY_CHECKS=1;
COMMIT;