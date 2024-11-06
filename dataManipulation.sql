-- This sql file will be using the colon (:) character to indicate that we are looking at a variable name which will
-- be provided by the frontend UI

-- Created by Peter Mora-Stevens & Kathryn Butler

-- Adoptions interaction
    -- Recieve all adoption records for the adoptions page
    SELECT * FROM Adoptions;

    -- Recieve a single adoption record based on adoptionId from the form
    SELECT adoptionID, customerID, catID, adoptionDate, adoptionFee 
    FROM Adoptions 
    WHERE adoptionID = :adoptionID_in_form

    -- Insert a new adoption record
    INSERT INTO Adoptions
    (
        customerID,
        catID,
        adoptionDate,
        adoptionFee
    ) 
    VALUES 
    (
        :customerID_in_form,
        :catId_in_form,
        :date_in_form,
        :adoptionFee_in_form
    );

    -- Edit/Update a single adoption record based on adoptionId from the form
    UPDATE Adoptions
    SET 
    (
        customerID = :customerID_in_form,
        catID = :catId_in_form,
        adoptionDate = :date_in_form,
        adoptionFee = :adoptionFee_in_form
    )
    WHERE adoptionID = :adoptionID_in_form

    -- Delete a single Adoption record based on adoptionId from the form
    DELETE FROM Adoptions WHERE adoptionID = :adoptionID_in_form


-- Admissions interaction
    -- Recieve all admission records for the admissions page
    SELECT * FROM Admissions;

    -- Recieve a single admission record based on admissionID from the form
    SELECT admissionID, customerID, admissionDate, duration, fee 
    FROM Admissions 
    WHERE admissionID = :admissionID_in_form

    -- Insert a new admission record
    INSERT INTO Admissions
    (
        customerID,
        admissionDate,
        duration,
        fee
    ) 
    VALUES 
    (
        :customerID_in_form,
        :date_in_form,
        :duration_in_form,
        :fee_in_form
    );

    -- Edit/Update a single admission record based on admissionID from the form
    UPDATE Admissions
    SET 
    (
        customerID = :customerID_in_form,
        admissionDate = :date_in_form,
        duration = :duration_in_form,
        fee = :fee_in_form
    )
    WHERE admissionID = :admissionID_in_form

    -- Delete a single Admission record based on admissionID from the form
    DELETE FROM Admissions WHERE admissionID = :admissionID_in_form


-- Cats interaction
    -- Recieve all cat records for the Cats page
    SELECT * FROM Cats;

    -- Recieve a single cat record based on catID from the form
    SELECT catID, catName, catDescription, age, breed, adopted 
    FROM Cats 
    WHERE catID = :catID_in_form

    -- Insert a new cat record
    INSERT INTO Cats
    (
        catName,
        catDescription,
        age,
        breed,
        adopted
    ) 
    VALUES 
    (
        :catName_in_form,
        :catDescription_in_form,
        :age_in_form,
        :breed_in_form,
        :adoption_status_in_form
    );

    -- Edit/Update a single cat record based on catID from the form
    UPDATE Cats
    SET 
    (
        catName = :catName_in_form,
        catDescription = :catDescription_in_form,
        age = :age_in_form,
        breed = :breed_in_form,
        adopted = :adoption_status_in_form
    )
    WHERE catID = :catID_in_form

    -- Delete a single Cat record based on catID from the form
    DELETE FROM Cats WHERE catID = :catID_in_form


-- Customer interaction
    -- Recieve all customer records for the Customers page
    SELECT * FROM Customers;

    -- Recieve a single customer record based on customerID from the form
    SELECT customerID,name, email, phone
    FROM Customers 
    WHERE custmerID = :customerID_in_form

    -- Insert a new customer record
    INSERT INTO Customers
    (
        name, 
        email, 
        phone
    ) 
    VALUES 
    (
        :name_in_form,
        :email_in_form,
        :phone_in_form,
    );

    -- Edit/Update a single customer record based on customerID from the form
    UPDATE Customers
    SET 
    (
        name = :name_in_form,
        email = :email_in_form,
        phone = :phone_in_form
    )
    WHERE custmerID = :customerID_in_form

    -- Delete a single customer record based on customerID from the form
    DELETE FROM Customers WHERE customerID = :customerID_in_form


-- ProductInventory interaction
    -- Recieve all product records for the ProductInventory page
    SELECT * FROM ProductInventory;

    -- Recieve a single customer record based on customerID from the form
    SELECT productID, productName, price, productCategory
    FROM ProductInventory 
    WHERE productID = :productID_in_form

    -- Insert a new product record
    INSERT INTO ProductInventory
    (
        productName, 
        price, 
        productCategory
    ) 
    VALUES 
    (
        :productName_in_form,
        :price_in_form,
        :productCategory_in_form,
    );

    -- Edit/Update a single product record based on productID from the form
    UPDATE ProductInventory
    SET 
    (
        productName = :productName_in_form,
        price = :price_in_form,
        productCategory = :productCategory_in_form
    )
    WHERE productID = :productID_in_form

    -- Delete a single product record based on productID from the form
    DELETE FROM ProductInventory WHERE productID = :productID_in_form


-- Purchases interaction
    -- Recieve all purchase records for the Purchases page
    SELECT * FROM Purchases;

    -- Recieve a single customer record based on customerID from the form
    SELECT purchaseID, custmerID, purchaseDate, purchaseCost
    FROM Purchases 
    WHERE purchaseID = :purchaseID_in_form

    -- Insert a new purchase record
    INSERT INTO Purchases
    (
        custmerID, 
        purchaseDate, 
        purchaseCost
    ) 
    VALUES 
    (
        :custmerID_in_form,
        :purchaseDate_in_form,
        :purchaseCost_in_form,
    );

    -- Edit/Update a single purchase record based on purchaseID from the form
    UPDATE Purchases
    SET 
    (
        custmerID = :custmerID_in_form,
        purchaseDate = :purchaseDate_in_form,
        purchaseCost = :purchaseCost_in_form
    )
    WHERE purchaseID = :purchaseID_in_form

    -- Delete a single purchase record based on purchaseID from the form
    DELETE FROM Purchases WHERE productID = :productID_in_form


-- ProductPurchases interaction
    -- Recieve all ProductPurchase records for the ProductPurchases page
    SELECT * FROM ProductPurchases;

    -- Recieve a single productPurchase record based on productPurchaseID from the form
    SELECT productPurchaseID, productID, purchaseID
    FROM ProductPurchases 
    WHERE productPurchaseID = :productPurchaseID_in_form

    -- Insert a new productPurchase record
    INSERT INTO ProductPurchases
    (
        productID,
        purchaseID
    ) 
    VALUES 
    (
        :productID_in_form,
        :purchaseID_in_form
    );

    -- Edit/Update a single productPurchase record based on productPurchaseID from the form
    UPDATE ProductPurchases
    SET 
    (
        productID = :productID_in_form,,
        purchaseID = :purchaseID_in_form
    )
    WHERE productPurchaseID = :productPurchaseID_in_form

    -- Delete a single productPurchase record based on productPurchaseID from the form
    DELETE FROM ProductPurchases WHERE productPurchaseID = :productPurchaseID_in_form