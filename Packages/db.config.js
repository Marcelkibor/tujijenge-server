'use strict';
const mysql = require('mysql');
const dbConn = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '!Trishmorgan899',
    database : 'tujijenge_test'
  });
  dbConn.connect(function(err) {
    if (err) {
        console.log("error occurred while connecting",err);
    } else {
        console.log("connection created with mysql successfully");
    }
});
module.exports = dbConn;
