const inquirer = require('inquirer');
const db = require('./db/connection.js');
const { addRole, addEmployee, addDepartment, removeRole, getAllEmployees, getAllRoles, updateRole, getAllDepartments } = require('./utils/queries');

const showMenu = () => {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'menu',
            message: 'What would you like to do?',
            choices: ['View All Employees', 'View All Departments', 'View All Employees By Manager', 'Add a Department', 'Add Employee', 'Remove Employee', 'Update Employee Role', 'Update Employee Manager', 'View All Roles', 'Add Role', 'Remove Role', 'Exit'],
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
    else if (data.menu == 'Add Employee') {
        addEmployeePrompt();
    }
    else if (data.menu == 'Update Employee Role') {
        updateRolePrompt();
    }
    else if (data.menu == 'View All Departments') {
        getAllDepartments();
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

const addEmployeePrompt = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'first',
            message: `What is the first name of the employee?`,
            validate: firstName => {
                if (firstName) {
                    return true;
                }
                else {
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'last',
            message: `What is the last name of the employee?`,
            validate: lastName => {
                if (lastName) {
                    return true;
                }
                else {
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'role',
            message: `What is the role of the employee?`,
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
            name: 'manager',
            message: `Who is the employee's Manager?`,
            validate: managerName => {
                if (managerName) {
                    return true;
                }
                else {
                    return false;
                }
            }
        }
    ]).then(data => {
        addEmployee(data.first, data.last, data.role, data.manager);
    })
}

let choiceArray = [];

const employeeList = () => {
    db.promise().query(`SELECT first_name, last_name FROM employee`)
        .then(([rows]) => {
            for (i = 0; i < rows.length; i++) {
                let employee = console.log(rows[i].first_name + ' ' + rows[i].last_name)
                choiceArray.push(employee);
            }
        })
}

const updateRolePrompt = () => {
    employeeList();
    return inquirer.prompt([
        {
            type: 'list',
            name: 'name',
            message: 'Select the employee you want to update',
            choices: choiceArray
        }
    ])
}

const addDepartmentPrompt = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'deptName',
            message: 'What is the department name?',
            validate: deptName => {
                if (deptName) {
                    return true;
                }
                else {
                    return false;
                }
            }
        }
    ])
        .then(data => {
            addDepartment(data.deptName)
        })
}

showMenu();

module.exports = showMenu;