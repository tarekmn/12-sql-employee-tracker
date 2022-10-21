const mysql = require("mysql2");

// Connect to database , then export:
const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "Vikings123$",
    database: "company_db",
  },
  console.log(`Connected to the company_db database.`)
);

module.exports = db;
