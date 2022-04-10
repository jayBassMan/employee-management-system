var inquirer = require("inquirer");
const connection = require("../config/connection");
const first = require("../server");

// functions

const viewAllDepartment = (db, start) => {
  // Render department table
  db.query("SELECT * FROM department", (req, res) => {
    if (req) throw req;
    console.table(res);
    start();
  });
};

const viewAllRoles = (db, start) => {
  // Render employee table
  db.query("SELECT * FROM role", (err, results) => {
    if (err) throw err;
    console.table(results);
    start();
  });
};

const viewAllEmployees = (db, start) => {
  db.query(`SELECT * FROM employee `, (err, results) => {
    if (err) throw err;
    console.table(results);
    start();
  });
};

module.exports = { viewAllDepartment, viewAllRoles, viewAllEmployees };
