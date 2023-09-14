const mysql = require("mysql2")

const db = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "Password1998!",
    database: "employeetracker_db"
});

module.exports = db;
