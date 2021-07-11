const db = require('../db/connection.js');
const cTable = require('console.table');

// view all employees
async function getAllEmployees() {
    db.promise().query(`SELECT * FROM employee`)
        .then(([rows]) => {
            console.table(rows);
        })
        .catch(console.log)
}
// view all roles

async function getAllRoles() {
    db.promise().query(`SELECT * FROM role`)
        .then(([rows]) => {
            console.table(rows);
        })
        .catch(console.log)
}

// add a role

async function addRole(title, salary) {
    const sql = `INSERT INTO role (title, salary) VALUES (?,?)`;
    const params = [title, salary];
    db.promise().query(sql, params)
        .then(getAllRoles())
        .catch(console.log)
}

// remove a role

async function removeRole(id) {
    const sql = `DELETE FROM role WHERE id = ?`;
    const params = [id];
    db.promise().query(sql, params)
        .then(getAllRoles())

        .catch(console.log);
}

// add an employee

async function addEmployee(first, last, role, manager) {
    const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`;
    const params = [first, last, role, manager];
    db.promise().query(sql, params)
        .then(getAllEmployees())
        .catch(console.log);
}

// update an employee's role

async function updateRole(emp_id, role_id) {
    const sql = `UPDATE employee SET role_id = ? WHERE id = ?`;
    const params = [role_id, emp_id];
    db.promise().query(sql, params)
        .then(getAllEmployees())
        .catch(console.log);
}

// get list of all departments

async function getAllDepartments() {
    db.promise().query(`SELECT * FROM department`)
        .then(([rows]) => {
            console.table(rows);
        })
        .catch(console.log)
}

// add a department

async function addDepartment(department) {
    const sql = `INSERT INTO department (dept_name) VALUES (?)`;
    const params = [department];
    db.promise().query(sql, params)
        .then(getAllDepartments())
        .catch(console.log);
}

// remove a department

async function removeDepartment(department) {
    const sql = `DELETE FROM department WHERE id = ?`;
    const params = [department];
    db.promise().query(sql, params)
        .then(getAllDepartments())
        .catch(console.log);
}

module.exports = { addRole, removeRole, addEmployee, getAllEmployees, getAllRoles, updateRole, getAllDepartments, addDepartment, removeDepartment }