// Importing the mysql & inquirer packages
const inquirer = require('inquirer');
const mysql = require('mysql2');

// Connect to database
const db = mysql.createConnection({
    host: 'localhost',
    // MYSQL username & pass
    user: 'root',
    password: 'pNk9UeLmIY15!0IU',
    database: 'employees_db'
},

    console.log(`Connected to employees_db database.`)
);

// Creates an array of prompts for user to respond to in order to organize the database accordingly.

const dbQuestions = [{
    type: 'input',
    name: 'serviceQuestion',
    message: "What would you like to do?"
},

{
    type: 'input',
    name: 'departmentName',
    message: "What is the name of your department?"

},

{
    type: 'input',
    name: 'customerServiceQuestion',
    message: "What would you like to do?"

},

{
    type: 'input',
    name: 'roleName',
    message: "What is the name of your role"

},

{
    type: 'input',
    name: 'salary',
    message: "What is the salary of the role?"

},

{
    type: 'input',
    name: 'departmentRole',
    message: "Which department does the role belong to?"

},

{
    type: 'input',
    name: 'employeeQuestion',
    message: "What would you like to do?"

},

{
    type: 'input',
    name: 'employeeFirstName',
    message: "What is the employee's first name?"

},

{
    type: 'input',
    name: 'employeeLastName',
    message: "What is the employee's last name?"

},
{
    type: 'input',
    name: 'employeeRole',
    message: "What is the employee's role?"

},
{
    type: 'input',
    name: 'employeeManager',
    message: "Who is the employee's maanger?"

},
{
    type: 'input',
    name: 'updateQuestion',
    message: "What would you like to do?"

},

{
    type: 'list',
    name: 'department',
    message: "Which employee's role do you want to update?",
    choices: ['Malia Brown', 'Sara Lourd', 'Tom Allen', 'Sam Kash', 'John Doe'],

},


];

// The prompt takes the questions that are stored in the readQuestions array and then once the questions are answered they are passed to the .then promise. The answers are stored in the answers object.   

function init() {
    inquirer.prompt(dbQuestions).then((answers) => {
        const { serviceQuestion, departmentName, customerServiceQuestion, roleName, salary, departmentRole, employeeQuestion, employeeFirstName, employeeLastName, employeeRole, employeeManager, updateQuestion, department } = answers;
    });
};

init();
