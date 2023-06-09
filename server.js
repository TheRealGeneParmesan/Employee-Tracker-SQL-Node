// Importing the mysql & inquirer packages
const inquirer = require('inquirer');
const mysql = require('mysql2');
require('dotenv').config();
const cTable = require('console.table')
const logo = require('asciiart-logo');

// Connect to database
const db = mysql.createConnection({
    host: 'localhost',
    // MYSQL username & pass
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

//  Connects to employees database
db.connect((err) => {
    if (err) {
        console.error(err);
    }
    console.log(`Connected to employees_db database.`);
    console.log(
        logo({ name: 'Employee Database', font: 'ANSI Shadow', lineChars: 10, padding: 2, margin: 3, borderColor: 'grey', logoColor: 'magenta', textColor: 'green' }).render());
    letsGetItStarted();
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
                console.log("bye")
            }
        });
};

// Displays all the employees in the database 
const viewAllEmployees = () => {
    const sql = `SELECT employees.id as ID, employees.first_name AS First_Name, employees.last_name as Last_Name, roles.title AS Title, departments.department_name AS Department, roles.salary AS Salary, CONCAT(manager.first_name, " ",manager.last_name) AS Manager 
    FROM employees 
    JOIN roles ON employees.role_id = roles.id 
    JOIN employees manager ON employees.manager_id = manager.id 
    JOIN departments ON roles.department_id = departments.id`;

    db.query(sql, (err, rows) => {
        if (err) throw err;
        console.table(rows);
        letsGetItStarted();
    });
};

// Adds new employee to table 

const addEmployee = () => {

    const roleSql = `SELECT id, title FROM roles`;
    const managerSql = `SELECT id, CONCAT(first_name," ", last_name) as name FROM employees WHERE manager_id IS NOT NULL`;

    db.query(roleSql, (err, roles) => {
        if (err) throw err;

        db.query(managerSql, (err, managers) => {
            if (err) {
                console.log(err);
                throw err;
            }

            // We use the map method here to create new arrays of objects to use for our role selection as well as our manager selection.

            const roleChoices = roles.map((role) => ({
                name: role.title,
                value: role.id,
            }));

            const managerChoices = managers.map((manager) => ({
                name: manager.name,
                value: manager.id,
            }));

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
                    validate: (input) => input.length <= 15,
                },

                {
                    type: 'list',
                    name: 'role_id',
                    message: "What is the employee's role?",
                    choices: roleChoices

                },

                {
                    type: 'list',
                    name: 'manager_id',
                    message: "Who is the employee's manager?",
                    choices: managerChoices

                },

                // Once we receive the name of the employee's first name, last name, role and manager from the user, we add the answers to the database 

            ]).then((answers) => {
                const { first_name, last_name, role_id, manager_id } = answers;

                const sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`;
                db.query(sql, [first_name, last_name, role_id, manager_id], (err, result) => {
                    if (err) throw err;
                    console.log(`Added ${first_name} ${last_name} to the database.`);
                    viewAllEmployees();
                });
            });

        });
    });
};


// Updates the selected employee and their role 

const updateEmployeeRole = () => {

    const employeeSql = `SELECT id, first_name, last_name FROM employees`;
    const roleSql = `SELECT id, title FROM roles`;

    db.query(employeeSql, (err, employeeResults) => {
        if (err) throw err;

        db.query(roleSql, (err, roleResults) => {
            if (err) throw err;

            // Uses the map method to create new arrays of objects to select a particular employee and update their role. 

            const employees = employeeResults.map((employee) => ({
                name: `${employee.first_name} ${employee.last_name}`,
                value: employee.id,
            }));

            const roleChoices = roleResults.map((role) => ({
                name: role.title,
                value: role.id,
            }));

            inquirer.prompt([
                {
                    type: 'list',
                    name: 'employeeId',
                    message: "Which employee's role do you want to update?",
                    choices: employees,
                },

                {
                    type: 'list',
                    name: 'roleAssignment',
                    message: 'Which role do you want to assign the selected employee?',
                    choices: roleChoices

                },
            ])
                .then((answers) => {
                    const { employeeId, roleAssignment } = answers;
                    const sql = `UPDATE employees SET role_id = ? WHERE id = ?`;
                    db.query(sql, [roleAssignment, employeeId], (err, result) => {
                        if (err) throw err;
                        console.log(`Updated employee's role.`);
                        viewAllEmployees();
                    });
                });
        });
    });
};

// Displays all roles when choosing the viewAllRoles option

const viewAllRoles = () => {

    const sql = `SELECT roles.id AS id, roles.title AS Title, departments.department_name as Department, roles.salary AS Salary FROM roles JOIN departments ON roles.department_id = departments.id ORDER BY departments.department_name ASC`;

    db.query(sql, (err, rows) => {
        if (err) throw err;
        console.table(rows);
        letsGetItStarted();
    });
};

// Adds a new role based on response and then runs the viewAllRoles function to show the updated roles within the database.

const addRole = () => {

    const sql = `SELECT id, department_name FROM departments `;
    db.query(sql, (err, rows) => {
        if (err) throw err;

        // Create new array of objects to use for our department selection. 

        const departmentChoices = rows.map(row => ({
            name: row.department_name,
            value: row.id
        }));

        inquirer.prompt([
            {
                type: 'input',
                name: 'role_name',
                message: "What is the name of the role?",
                validate: (input) => input.length <= 20
            },

            {
                type: 'input',
                name: 'salary',
                message: "What is the salary for this role?",
                validate: (input) => {
                    return isNaN(input) ? 'Please enter a number' : true;
                },
            },

            {
                type: 'list',
                name: 'department_role',
                message: "Which department does the role belong to?",
                choices: departmentChoices
            }


            // Once we receive the answers for role name we insert a new row in the roles table with the answers from the prompt. 

        ]).then((answers) => {
            const { role_name, salary, department_role } = answers;
            const sql = `INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)`;

            db.query(sql, [role_name, salary, department_role], (err, result) => {
                if (err) throw err;
                console.log(`Added ${role_name} to the database.`);
                viewAllRoles();
            });
        });

    });
};

// Displays the department and department id when choosing the viewAllDepartments option

const viewAllDepartments = () => {
    const sql = `SELECT id, department_name AS Department FROM departments ORDER BY department_name ASC`;

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
