const db = require('../db/connection.js');
const cTable = require('console.table');
const prompt = require('../index.js');

// view all employees
const getAllEmployees = () => {
    db.promise().query(`SELECT * FROM employee`)
        .then(([rows]) => {
            console.table(rows);
        })
        .then(db.end())
        .catch(console.log)
}

// view all roles

const getAllRoles = () => {
    db.promise().query(`SELECT * FROM role`)
        .then(([rows]) => {
            console.table(rows);
        })
        .then(db.end())
        .catch(console.log)
}

// add a role

const addRole = (title, salary) => {
    const sql = `INSERT INTO role (title, salary) VALUES (?,?)`;
    const params = [title, salary];
    db.promise().query(sql, params)
        .then(getAllRoles())
        .catch(console.log)
}

const removeRole = (id) => {
    const sql = `DELETE FROM role WHERE id = ?`;
    const params = [id];
    db.promise().query(sql, params)
        .then(getAllRoles())
        .catch(console.log);
}

const addEmployee = (first, last, role, manager) => {
    const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`;
    const params = [first, last, role, manager];
    db.promise().query(sql, params)
        .then(getAllEmployees())
        .catch(console.log);
}
const updateRole = (emp_id, role_id) => {
    const sql = `UPDATE employee SET role_id = ? WHERE id = ?`;
    const params = [emp_id, role_id];
    db.promise().query(sql, params)
        .then(getAllEmployees())
        .catch(console.log);
}

const getAllDepartments = () => {
    db.promise().query(`SELECT * FROM department`)
        .then(([rows]) => {
            console.table(rows);
        })
        .then(db.end())
        .catch(console.log)
}

const addDepartment = (department) => {
    const sql = `INSERT INTO department (dept_name) VALUES (?)`;
    const params = [department];
    db.promise().query(sql, params)
        .then(getAllDepartments())
        .catch(console.log);

}

module.exports = { addRole, removeRole, addEmployee, getAllEmployees, getAllRoles, updateRole, getAllDepartments, addDepartment }