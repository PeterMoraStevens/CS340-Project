// Recieved from activity 2 week 1
var express = require('express');   // We are using the express library for the web server
var app     = express();            // We need to instantiate an express object to interact with the server in our code
PORT        = 63732;                 // Set a port number at the top so it's easy to change in the future

var db = require('./db-connector')
const path = require("path");
const bodyParser = require('body-parser');
const cors = require("cors");
app.use(express.static("dist"));
app.use(bodyParser.json());
app.use(cors());

// gets all customers to populate the table
app.get("/getCustomers", function (req, res) {
  getAll = "SELECT * FROM Customers;";

  db.pool.query(getAll, function (err, results, fields) {
    res.json(results)
  })
})

// adds a customer to our SQL DB
app.post('/addCustomer', (req, res) => {
  const { name, email, phone } = req.body;
  // breaks values apart and inserts into the query using body-parser library
  const query = 'INSERT INTO Customers (name, email, phone) VALUES (?, ?, ?);';
  db.pool.query(query, [name, email, phone], (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(201).json({ message: 'Customer added', id: results.insertId });
    }
  });
});

// update customer based on id query in the url
app.put('/updateCustomer/:id', (req, res) => {
  const { id } = req.params;
  const { name, email, phone } = req.body;
  // breaks values apart and inserts into the query using body-parser library (same as above)
  const query = 'UPDATE Customers SET name = ?, email = ?, phone = ? WHERE customerID = ?;';
  db.pool.query(query, [name, email, phone, id], (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ message: 'Customer updated' });
    }
  });
});

// Delete customer based on query ID in url
app.delete('/deleteCustomer/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM Customers WHERE customerID = ?;';
  db.pool.query(query, [id], (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ message: 'Customer deleted' });
    }
  });
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
  console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});