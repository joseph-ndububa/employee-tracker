const inquirer = require('inquirer');
const db = require('./db/connection.js');
const { addRole, removeRole, getAllEmployees, getAllRoles } = require('./utils/queries');

const showMenu = () => {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'menu',
            message: 'What would you like to do?',
            choices: ['View All Employees', 'View All Employees By Department', 'View All Employees By Manager', 'Add Employee', 'Remove Employee', 'Update Employee Role', 'Update Employee Manager', 'View All Roles', 'Add Role', 'Remove Role', 'Exit'],
            validate: menuInput => {
                if (menuInput) {
                    return true;
                }
                else {
                    return false;
                }
            }
        }
    ]).then(data => {
        selectionHandler(data);
    })
};

const selectionHandler = (data) => {
    if (data.menu == 'View All Employees') {
        getAllEmployees()
    }
    else if (data.menu == 'View All Roles') {
        getAllRoles();
    }
    else if (data.menu == 'Add Role') {
        addRolePrompt();
    }
    else if (data.menu == 'Remove Role') {
        removeRolePrompt();
    }
    else if (data.menu == 'Exit') {
        db.end();
    }
}

const addRolePrompt = () => {
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

const removeRolePrompt = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'id',
            message: `What is the ID of the role?`,
            validate: roleTitle => {
                if (roleTitle) {
                    return true;
                }
                else {
                    return false;
                }
            }
        }
    ]).then(data => {
        removeRole(data.id);
    })
}

showMenu();

module.exports = showMenu;