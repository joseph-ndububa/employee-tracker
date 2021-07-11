const inquirer = require('inquirer');
const getAllEmployees = require('./utils/queries');

const showMenu = () => {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'menu',
            message: 'What would you like to do?',
            choices: ['View All Employees', 'View All Employees By Department', 'View All Employees By Manager', 'Add Employee', 'Remove Employee', 'Update Employee Role', 'Update Employee Manager', 'View All Roles', 'Add Role', 'Remove Role', 'Exit'],
            validate: menuInput => {
                if (menuInput == 'View All Employees') {
                    return true;
                }
                else {
                    return false;
                }
            }
        }
    ]).then(data => {
        if (data.menu == 'View All Employees') {
            getAllEmployees();
        }
    })
}

showMenu();