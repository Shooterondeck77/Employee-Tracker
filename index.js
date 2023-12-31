const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');

const db = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "Password1998!",
    database: "employeetracker_db"
});

db.connect(function (err) {
    if (err) {
        throw err
    }
    console.log("MySQL Connected")
    menu();
});

function menu() {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'choice',
                message: 'What would you like to see?',
                choices: ['View all Departments', 'View all Roles', 'View all Employees', 'Add Role', 'Add Employee', 'Update Employee', 'Quit']
            },
       
    ]).then(response => {
        console.log("Answers: ", response)
                if (response.choice === 'View all Departments') {
                    allDepartments()
                }
                else if (response.choice === 'View all Roles') {
                    allRoles()
                }
                else if (response.choice === 'View all Employees') {
                    allEmployees()
                }
                else if (response.choice === 'Add Role') {
                    addRole()
                }
                else if (response.choice === 'Add Employee') {
                    addEmployee()
                }
                else if (response.choice === 'Update Employee') {
                    updateEmployee()
                }
                else if (response.choice === 'Quit') {
                    console.log('Goodbye!');
                }
            })
}

function allDepartments() {
    const query = `SELECT * FROM department;`;
    db.query(query,
        function (err, res) {
            if (err) throw err
            console.table(res)
            menu()
        })
}

function allRoles() {
    const query = `SELECT * FROM role;`;
    db.query(query,
        function (err, res) {
            if (err) throw err
            console.table(res)
            menu()
        })
}

function allEmployees() {
    const query = `SELECT * FROM employee`;
    db.query(query,
        function (err, res) {
            if (err) throw err
            console.table(res)
            menu()
        })
}

function addRole() {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'roleName',
                message: 'What is the name of the role?'
            },
            {
                type: 'input',
                name: 'salary',
                message: 'What is the salary of the role?'
            },
            {
                type: 'input',
                name: 'roleDepartment',
                message: 'Which department does the role belong to?'
            },
        ]).then(response => {
            const query = `INSERT INTO role SET ?`
            db.query(
                query, {
                title: response.roleName,
                salary: response.salary,
                department_id: response.roleDepartment
            }
            )
            console.log(`Added ${response.roleName} to the database`);
            menu()
        })
}

function addEmployee() {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'firstName',
                message: "What is the employee's first name?"
            },
            {
                type: 'input',
                name: 'lastName',
                message: "What is the employee's last name?"
            },
            {
                type: 'input',
                name: 'employeeRole',
                message: "What is the employee's role id?"
            },
            {
                type: 'input',
                name: 'manager',
                message: "What is the employee's manager id?"
            },
        ]).then(response => {
            const query = `INSERT INTO employee SET ?`
            db.query(
                query, {
                first_name: response.firstName,
                last_name: response.lastName,
                role_id: response.employeeRole,
                manager_id: response.manager
            }
            )
            console.log(`Added ${response.firstName} ${response.lastName} to the database`);
            menu()
        })
}

function updateEmployee() {
    const employeeSql = `SELECT * FROM employee`;
    db.query(employeeSql, (err, data) => {
        if (err) throw err;

        const employees = data.map(({ id, first_name, last_name }) => ({ name: first_name + " " + last_name, value: id }));

        inquirer.prompt([
            {
                type: 'list',
                name: 'name',
                message: "Which employee would you like to update?",
                choices: employees
            }
        ])
            .then(empChoice => {
                const employee = empChoice.name;
                const params = [];
                params.push(employee);

                const roleSql = `SELECT * FROM role`;

                db.query(roleSql, (err, data) => {
                    if (err) throw err;

                    const role = data.map(({ id, title }) => ({ name: title, value: id }));

                    inquirer.prompt([
                        {
                            type: 'list',
                            name: 'role',
                            message: "What is the employee's new role?",
                            choices: role
                        }
                    ])
                        .then(roleChoice => {
                            const role = roleChoice.role;
                            params.push(role);

                            let employee = params[0]
                            params[0] = role
                            params[1] = employee

                            const sql = `UPDATE employee SET role_id = ? WHERE id = ?`;

                            db.query(sql, params, (err, result) => {
                                if (err) throw err;
                                console.log("Employee has been updated!");

                                menu();
                            });
                        });
                });
            });
    });
};