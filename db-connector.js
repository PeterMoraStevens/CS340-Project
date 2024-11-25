var mysql = require('mysql');

var pool = mysql.createPool({
    connectionLimit: 10,
    host: 'classmysql.engr.oregonstate.edu',
    user: 'cs340_butlekat',
    password: '3384',
    database: 'cs340_butlekat'
});

module.exports.pool = pool;