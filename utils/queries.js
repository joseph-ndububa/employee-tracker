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
    console.log(id);
    const sql = `DELETE FROM role WHERE id = ?`;
    const params = [id];
    db.promise().query(sql, params)
        .then(getAllRoles())
        .catch(console.log);
}

module.exports = { addRole, removeRole, getAllEmployees, getAllRoles };