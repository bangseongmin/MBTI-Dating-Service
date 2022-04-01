const mysql = require('mysql');

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: "root",
    password: "root",
    database: "mbti_dating",
});

db.connect();
module.exports = db;