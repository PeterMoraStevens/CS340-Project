// Recieved from activity 2 week 1

// Get an instance of mysql we can use in the app
var mysql = require('mysql')

// Create a 'connection pool' using the provided credentials
var pool = mysql.createPool({
    connectionLimit : 10,
    host            : 'classmysql.engr.oregonstate.edu',
    user            : 'cs340_morastep',
    password        : '3471',
    database        : 'cs340_morastep'
})

// Export it for use in our application
module.exports.pool = pool;