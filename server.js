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

// Logs any error with connecting to database
db.connect((err) => {
    if (err) {
        console.error(err);
    }
    console.log(`Connected to employees_db database.`);
});

// Function to start the inquirer prompt, which gives us a list of menu options for our employee database

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
        // Calls the respective function based on the selection chosen in the menu
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

// Displays all the employees in the database 
const viewAllEmployees = () => {
    const sql = `SELECT * FROM EMPLOYEES`;
    db.query(sql, (err, rows) => {
        if (err) throw err;
        console.table(rows);
        letsGetItStarted();
    });
};

// Adds new employee to table 

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

            // Validate statement to ensure that the role ID response is an integer between 1-5
            validate: (input) => {
                const roleID = Number(input);
                if (Number.isInteger(roleID) && roleID >= 1 && roleID <= 5)
                    return true;
                else {
                    return "Enter a valid integer between 1-5"
                }
            }
        },

        {
            type: 'input',
            name: 'manager_id',
            message: "Who is the employee's manager?",

            // Validate statement to ensure that the manager ID response is an integer between 1-5
            validate: (input) => {
                const managerID = Number(input);
                if (Number.isInteger(managerID) && managerID >= 1 && managerID <= 5)
                    return true;
                else {
                    return "Enter a valid integer between 1-5"
                }
            }
        },

        // Once we receive the answers for first name, last name, role id and manager ID, we insert a new row in the employees table with the answers from the prompt and we log it to make sure that the employee was added correctly.

    ]).then((answers) => {
        const { first_name, last_name, role_id, manager_id } = answers;

        const sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`;
        db.query(sql, [first_name, last_name, role_id, manager_id], (err, result) => {
            if (err) throw err;
            console.log(`Added ${first_name} ${last_name} to the database.`);
            viewAllEmployees();
        });
    });
};


const viewAllDepartments = () => {
    const sql = `SELECT departments.department_name AS department 
    FROM departments 
    ORDER BY departments.department_name ASC`;
    db.query(sql, (err, rows) => {
        if (err) throw err;
        console.table(rows);
        letsGetItStarted();
    });
};

// Adds a new department based on response and then runs the viewAllDepartments function to show the updated departments within the database.

const addDepartment = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'department_name',
            message: "What is the name of the department?",
            validate: (input) => input.length <= 20,
        },

        // Once we receive the answers for department name we insert a new row in the employees table with the answers from the prompt and log it

    ]).then((answers) => {
        const { department_name } = answers;

        const sql = `INSERT INTO departments (department_name) VALUES (?)`;
        db.query(sql, [department_name], (err, result) => {
            if (err) throw err;
            console.log(`Added ${department_name} to the database.`);
            viewAllDepartments();
        });
    });
};

const viewAllRoles = () => {
    const sql = `SELECT roles.title AS role
    FROM roles
    ORDER BY roles.title ASC`;
    db.query(sql, (err, rows) => {
        if (err) throw err;
        console.table(rows);
        letsGetItStarted();
    });
};

// Adds a new role based on response and then runs the viewAllRoles function to show the updated roles within the database.

const addRole = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'role_name',
            message: "What is the name of the role?",

        },

        {
            type: 'input',
            name: 'salary',
            message: "What is the salary for this role?",
            validate: (input) => {
                return isNaN(input) ? 'Please enter a number' : true;
            },
        },

        // Once we receive the answers for role name we insert a new row in the roles table with the answers from the prompt and log it

    ]).then((answers) => {
        const { role_name, salary } = answers;

        const sql = `INSERT INTO roles (title, salary) VALUES (?, ?)`;
        db.query(sql, [role_name, salary], (err, result) => {
            if (err) throw err;
            console.log(`Added ${role_name} to the database.`);
            viewAllRoles();
        });
    });
};

letsGetItStarted();




