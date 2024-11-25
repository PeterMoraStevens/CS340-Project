var express = require('express');
var app = express();
PORT = 3893;

var db = require('./db-connector');

app.get('/', async (req, res) => {
    res.send("/");
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});