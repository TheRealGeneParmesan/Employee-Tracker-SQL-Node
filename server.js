// Importing the mysql & inquirer packages
const inquirer = require('inquirer');
const mysql = require('mysql2');
require('dotenv').config();

// Connect to database
const db = mysql.createConnection({
    host: 'localhost',
    // MYSQL username & pass
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect((err) => {
    if (err) {
        console.error(err);
    }
    console.log(`Connected to employees_db database.`);
});

const letsGetItStarted = () => {
    inquirer.prompt([
        {
            type: 'list',
            name: 'serviceQuestion',
            message: 'What would you like to do?',
            choices: [
                'View all Employees',
                'Add Employee',
                'Update Employee Role',
                'View all Roles',
                'Add Role',
                'View all Departments',
                'Add Department',
                'Quit'
            ]
        }
    ])
        .then((answers) => {
            const { serviceQuestion } = answers;

            if (serviceQuestion === 'View all Employees') {
                viewAllEmployees();
            }

            if (serviceQuestion === 'Add Employee') {
                addEmployee();
            }
            if (serviceQuestion === 'Update Employee Role') {
                updateEmployeeRole();
            }
            if (serviceQuestion === 'View all Roles') {
                viewAllRoles();
            }
            if (serviceQuestion === 'Add Role') {
                addRole();
            }
            if (serviceQuestion === 'View all Departments') {
                viewAllDepartments();
            }
            if (serviceQuestion === 'Add Department') {
                addDepartment();
            }
            if (serviceQuestion === 'Quit') {
                db.end();
            }
        });
};


const viewAllEmployees = () => {
    const sql = `SELECT * FROM EMPLOYEES`;
    letsGetItStarted();
    db.query(sql, (err, rows) => {
        if (err) throw err;
        console.table(rows);
    });
};

const addEmployee = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'first_name',
            message: "What is the employee's first name?",
            validate: (input) => input.length <= 15,
        },
        {
            type: 'input',
            name: 'last_name',
            message: "What is the employee's last name?",
            validate: (input) => input.length <= 30,
        },
        {
            type: 'input',
            name: 'role_id',
            message: "What is the employee's title?",
            // May need an if/else statement here to ensure that they input the right description
            validate: (input) => input.length <= 15
        },
        {
            type: 'input',
            name: 'manager_id',
            message: "Who is the employee's manager?",

            // May need an if/else statement here to ensure that they input the right description
            validate: (input) => input.length <= 15
        },

    ]).then((answers) => {
        const { firstName, lastName, roleTitle, managerName } = answers;

        const sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id)`
        letsGetItStarted();
    });
};



const viewAllDepartments = () => {
    const sql = `Select department.id AS id, department.department_name AS department FROM department`;
    db.query(sql, (err, rows) => {
        if (err) throw err;
        console.table(rows);
        letsGetItStarted();
    });
};

letsGetItStarted();





// const dbQuestions = [{
//     type: 'list',
//     name: 'serviceQuestion',
//     message: "What would you like to do?",
//     choices: [
//     'View All Employees',
//     'Add Employee',
//     'Update Employee Role',
//     'View all Roles',
//     'Add Role',
//     'View all Departments',
//     'Add Department',
//     'Quit']
// },

// {
//     type: 'input',
//     name: 'departmentName',
//     message: "What is the name of your department?"

// },

// {
//     type: 'list',
//     name: 'serviceQuestion',
//     message: "What would you like to do?",
//     choices: ['View All Employees', 'Add Employee', 'Update Employee Role', 'View all Roles', 'Add Role', 'View all Departments', 'Add Department', 'Quit']
// },

// {
//     type: 'input',
//     name: 'roleName',
//     message: "What is the name of your role"

// },

// {
//     type: 'input',
//     name: 'salary',
//     message: "What is the salary of the role?"

// },

// {
//     type: 'input',
//     name: 'departmentRole',
//     message: "Which department does the role belong to?"

// },

// {
//     type: 'list',
//     name: 'serviceQuestion',
//     message: "What would you like to do?",
//     choices: ['View All Employees', 'Add Employee', 'Update Employee Role', 'View all Roles', 'Add Role', 'View all Departments', 'Add Department', 'Quit']

// },

// {
//     type: 'input',
//     name: 'employeeFirstName',
//     message: "What is the employee's first name?"

// },

// {
//     type: 'input',
//     name: 'employeeLastName',
//     message: "What is the employee's last name?"

// },
// {
//     type: 'input',
//     name: 'employeeRole',
//     message: "What is the employee's role?"

// },
// {
//     type: 'input',
//     name: 'employeeManager',
//     message: "Who is the employee's maanger?"

// },
// {
//     type: 'list',
//     name: 'serviceQuestion',
//     message: "What would you like to do?",
//     choices: ['View All Employees', 'Add Employee', 'Update Employee Role', 'View all Roles', 'Add Role', 'View all Departments', 'Add Department', 'Quit']

// },

// {
//     type: 'list',
//     name: 'department',
//     message: "Which employee's role do you want to update?",
//     choices: ['Malia Brown', 'Sara Lourd', 'Tom Allen', 'Sam Kash', 'John Doe'],

// },


// ];

// // The prompt takes the questions that are stored in the readQuestions array and then once the questions are answered they are passed to the .then promise. The answers are stored in the answers object.

// function init() {
//     inquirer.prompt(dbQuestions).then((answers) => {
//         const { serviceQuestion, departmentName, roleName, salary, departmentRole, employeeFirstName, employeeLastName, employeeRole, employeeManager, department } = answers;
//     });
// };

// init();
