const express = require('express');
// Import and require mysql2
const mysql = require('mysql2');
const cTable = require('console.table');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // MySQL password
    password: 'Vikings123$',
    database: 'company_db'
  },
  console.log(`Connected to the company_db database.`)
);

// Query database
// function displayDepartment() {
db.query('SELECT * from department', function (err, results) {
  console.table(results);
});
// }

db.query('SELECT * from role', function (err, results) {
  console.table(results);
});


db.query('SELECT * from employee', function (err, results) {
  console.table(results);
});

// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


// module.exports = server;