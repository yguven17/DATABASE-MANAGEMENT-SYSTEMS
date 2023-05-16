const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');

const app = express();

// Enable CORS
app.use(cors());

// Configure body-parser to handle POST requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Create a MySQL connection pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'nodejs',
});

app.post('/addUser', (req, res) => {
  const { name, surname, age, salary } = req.body;
  pool.query(`INSERT INTO user (name, surname, age, salary) VALUES (?, ?, ?, ?)`, [name, surname, age, salary], (error, results) => {
    if (error) throw error;
    res.send('Data added successfully!');
  });
});

app.get('/getAllUsers', (req, res) => {
  pool.query(`SELECT * FROM user`, (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

app.get('/getSalaryWithinRange', (req, res) => {
  const { minSalary, maxSalary } = req.query;
  pool.query(`SELECT * FROM user WHERE salary >= ${minSalary} AND salary <= ${maxSalary}`, (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

// Start the server
app.listen(3000, () => {
  console.log('Server running on port 3000');
});
