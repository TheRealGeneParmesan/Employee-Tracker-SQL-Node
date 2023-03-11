// Importing the mysql & inquirer packages
const inquirer = require('inquirer');
const mysql = require('mysql2');

// Connect to database
const db = mysql.createConnection({
    host: 'localhost',
    // MYSQL username & pass
    user: 'root',
    password: 'pNk9UeLmIY15!0IU',
    database: 'test'
},

    console.log(`Connected to employees_db database.`)
);

