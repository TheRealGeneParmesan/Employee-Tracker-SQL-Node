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
});

db.connect((err) => {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    console.log(`Connected to employees_db database.`);
});

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
        const { choices } = answers;

        if (choices === 'View all Employes') {
            viewAllEmployees();
        }

        if (choices === 'Add Employee') {
            addEmployee();
        }
        if (choices === 'Update Employee Role') {
            updateEmployeeRole();
        }
        if (choices === 'View all Roles') {
            viewAllRoles();
        }
        if (choices === 'Add Role') {
            addRole();
        }
        if (choices === 'View all Departments') {
            viewAllDepartments();
        }
        if (choices === 'Add Department') {
            addDepartment();
        }
        if (choices === 'Quit') {
            db.end();
        }
    });


const viewAllDepartments = () => {
    const sql = `Select department.id AS id, department.department_name AS department from department`;

    db.query(sql, (err, rows) => {
        if (err) throw err;
        console.table(rows);
    });
};

const viewAllEmployees = () => {
    const sql = `SELECT * FROM EMPLOYEES`;
    db.query(sql, (err, rows) => {
        if (err) throw err;
        console.table(rows);
    });
};















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
