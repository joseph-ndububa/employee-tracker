const db = require('../db/connection.js');
const cTable = require('console.table');

// view all employees
const getAllEmployees = () => {
    db.query(`SELECT * FROM employee`, (err, rows) => {
        if (err) {
            console.log(err);
            return;
        }
        else {
            console.table(rows);
            return;
        }
    })
}

// view all roles

const getAllRoles = () => {
    db.query(`SELECT * FROM role`, (err, rows) => {
        if (err) {
            console.log(err);
            return;
        }
        else {
            console.table(rows);
            return;
        }
    })
}

// add a role

const addRole = (title, salary) => {
    const sql = `INSERT INTO role (title, salary) VALUES (?,?)`;
    const params = [title, salary];
    db.query(sql, params, (err, result) => {
        if (err) {
            console.log(err);
            return;
        }
        else {
            console.table(result.affectedRows)
        }
    })
}

module.exports = { addRole, getAllEmployees, getAllRoles };