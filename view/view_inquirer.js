var inquirer = require("inquirer");
const connection = require("../config/connection");
const first = require("../server");

// functions

const viewAllDepartment = () => {
    // Render department table
    db.query("SELECT * FROM departments", (req, res) => {
        if (req) throw req;
        console.table(res);
        start();
    });
};

const viewAllRoles = () => {
    // Render employee table
    db.query("SELECT * FROM role", (err, results) => {
        if (err) throw err;
        console.table(results);
        start();
    });
};

const viewAllEmployees = () => {
    db.query(
        `SELECT `,
        (err, results) => {
            if (err) throw err;
            console.table(results);
            start();
        }
    );
};

module.exports = { viewAllDepartment, viewAllRoles, viewAllEmployees };
