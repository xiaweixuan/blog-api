var mysql = require('mysql');

var cfg = require('./db.config.json');

var pool = mysql.createPool(cfg);

module.exports = pool;
