const inquirer = require('inquirer');
const { addRole, getAllEmployees, getAllRoles } = require('./utils/queries');

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
            return;
        }
        else if (data.menu == 'View All Roles') {
            getAllRoles();
            return;
        }
        else if (data.menu == 'Add Role') {
            roleMenu();
            return;
        }
    })
}

const roleMenu = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'role',
            message: `What is the name of the role?`,
            validate: roleTitle => {
                if (roleTitle) {
                    return true;
                }
                else {
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'salary',
            message: `What is the salary for the role?`,
            validate: roleSalary => {
                if (roleSalary) {
                    return true;
                }
                else {
                    return false;
                }
            }
        }
    ]).then(data => {
        addRole(data.role, data.salary);
    })
}

showMenu();