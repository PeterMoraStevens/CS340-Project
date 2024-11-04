-- Created by Peter & Kathryn in group 21

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
    catDescription text,
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

INSERT INTO Customers(
    name,
    email,
    phone
) VALUES 
(
    "Sarah Martinez",
    "sarah.martinez@email.com",
    "555-123-4567"
),
(
    "Michael Chen",
    "michael.chen@email.com",
    "555-234-5678"
),
(
    "Olivia Hughes",
    "olivia.hughes@email.com",
    "555-345-6789" 
),
(
    "James Anderson",
    "james.anderson@email.com",
    "555-456-7890"
);

INSERT INTO Admissions
(
    customerID,
    admissionDate,
    duration,
    fee
) VALUES 
(
    4,
    "2022-08-07",
    30,
    10.00
),
(
    3,
    "2023-02-25",
    15,
    5.00
),
(
    4,
    "2023-03-12",
    60,
    20.00
),
(
    1,
    "2024-10-10",
    30,
    10.00
);

INSERT INTO ProductInventory
(
    productName,
    price,
    productCategory
) VALUES
(
    "Cat-ppuccino",
    4.50,
    "Drink"
),
(
    "Meowcha Latte",
    5.00,
    "Drink"
),  
(
    "Milk Tea with Boba",
    5.25,
    "Drink"
),
(
    "Pepp-paw-mint Tea",
    3.00,
    "Drink"
),
(
    "Kitty Cake Pop",
    2.50,
    "Snack"
),
(
    "Catnip Cookie",
    1.50,
    "Snack"
),
(
    "Paw Print Mini-Waffles (3)",
    3.50,
    "Snack"
),
(
    "Paws & Pastries Cat Cafe Mug",
    12.00,
    "Merchandise"
),
(
    "Paws & Pastries Cat Cafe Bag",
    15.00,
    "Merchandise"
),
(
    "Kitty Sweater",
    20.00,
    "Merchandise"
);

INSERT INTO ProductPurchases(
    purchaseID,
    productID
) VALUES (
    1,
    2
),
(
    2,
    8
),
(
    3,
    6
),
(
    4,
    3
),
(   3,
    6
);

INSERT INTO Purchases(
    customerID,
    purchaseDate,
    purchaseCost
) VALUES (
    4,
    "2023-10-31",
    5.00
),
(
    4,
    "2024-08-21",
    12.00
),
(
    1,
    "2024-09-04",
    3.00
),
(
    2,
    "2002-10-04",
    5.25
);

INSERT INTO Cats(
    catName,
    catDescription,
    age,
    breed,
    adopted
) VALUES (
    "Luna",
    "A shy black cat who takes time to warm up but loves head scratches.",
    2,
    "Domestic Shorthair",
    FALSE
),
(
    "Peanut",
    "A playful Siamese who loves to chase feather toys.",
    1,
    "Siamese",
    TRUE
),
(
    "Bella",
    "A calm and affectionate Maine Coon who enjoys lounging in sunny spots.",
    4,
    "Maine Coon",
    TRUE
),
(
    "Max",
    "A sweet calico who loves snuggling on laps.",
    3,
    "Calico",
    FALSE
);


INSERT INTO Adoptions(
    customerID,
    catID,
    adoptionDate,
    adoptionFee
) VALUES (
    2,
    3,
    "2023-07-03",
    30.00
),
(
    30.00
    4,
    2,
    "2024-08-24",
    30.00
);

SET FOREIGN_KEY_CHECKS=1;
COMMIT;