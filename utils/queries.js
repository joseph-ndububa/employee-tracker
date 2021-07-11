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
        }
    })
}

module.exports = getAllEmployees;