const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "rootroot",
    database: "employee_db"
});

db.connect(function (err) {
    if (err) throw err
    console.log("MySQL Connected")
    mainMenu();
});

function menu() {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'choice',
                message: 'What would you like to see?',
                choices: ['View all Departments', 'View all Roles', 'View all Employees', 'Add Department', 'Add Role', 'Add Employee', 'Update Employee', 'Quit']
            }]).then(response => {
                if (response.choice === 'View all Departments') {
                    allDepartments()
                }
                else if (response.choice === 'View all Roles') {
                    allRoles()
                }
                else if (response.choice === 'View all Employees') {
                    allEmployees()
                }
                else if (response.choice === 'Add Department') {
                    addDepartment()
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
