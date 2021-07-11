const inquirer = require('inquirer');
const db = require('./db/connection.js');
const { addRole, addEmployee, addDepartment, removeRole, getAllEmployees, getAllRoles, updateRole, getAllDepartments, removeDepartment } = require('./utils/queries');


// main menu

const showMenu = () => {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'menu',
            message: 'What would you like to do?',
            choices: ['View All Employees', 'View All Departments', 'Add a Department', 'Add Employee', 'Remove Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'Remove Role', 'Remove a Department', 'Exit'],
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

// decide what to do after user selects option

const selectionHandler = (data) => {
    if (data.menu == 'View All Employees') {
        getAllEmployees()
            .then(showMenu())
    }
    else if (data.menu == 'View All Roles') {
        getAllRoles()
            .then(showMenu())
    }
    else if (data.menu == 'Add Role') {
        addRolePrompt()
    }
    else if (data.menu == 'Remove Role') {
        removeRolePrompt()
    }
    else if (data.menu == 'Add Employee') {
        addEmployeePrompt()
    }
    else if (data.menu == 'Update Employee Role') {
        updateRolePrompt()
    }
    else if (data.menu == 'View All Departments') {
        getAllDepartments()
            .then(showMenu());
    }
    else if (data.menu == 'Add a Department') {
        addDepartmentPrompt()
    }
    else if (data.menu == 'Remove a Department') {
        removeDepartmentPrompt()
    }
    else if (data.menu == 'Exit') {
        db.end();
    }
}

// prompt user for adding role

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
        .then(data => {
            showMenu()
        })
}

// prompt user for removing role

const removeRolePrompt = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'id',
            message: `What is the ID of the role?`,
            validate: roleId => {
                if (roleId) {
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
        .then(data => {
            showMenu()
        })
}

// prompt user for adding employee

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
            message: `What is the role id?`,
            validate: roleId => {
                if (roleId) {
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
            message: `What is the employee's manager's id?`,
            validate: managerId => {
                if (managerId) {
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
        .then(data => {
            showMenu()
        })
}

// prompt user for updating an employee's role

const updateRolePrompt = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'empId',
            message: 'What is the ID of the employee you want to update?',
        },
        {
            type: 'input',
            name: 'newRoleId',
            message: 'What is the new role ID?',
        }
    ])
        .then(data => {
            updateRole(data.empId, data.newRoleId)
        })
        .then(data => {
            showMenu()
        })
}

// prompt user to add department

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
        .then(data => {
            showMenu()
        })
}

// prompt user to remove department

const removeDepartmentPrompt = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'deptId',
            message: `What is the ID of the department?`,
            validate: deptId => {
                if (deptId) {
                    return true;
                }
                else {
                    return false;
                }
            }
        }
    ]).then(data => {
        removeDepartment(data.deptId);
    })
        .then(data => {
            showMenu()
        })
}

showMenu();