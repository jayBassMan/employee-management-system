var inquirer = require("inquirer");
const connection = require("../config/connection");
const first = require("../server");

const update = (db, start) => {
  db.query("SELECT title as name, id as value FROM role", (err, results) => {
    if (err) throw err;
    db.query(
      'SELECT concat(first_name, " " ,last_name) as name, id as value FROM employee',
      (err, employeeData) => {
        inquirer
          .prompt([
            {
              name: "role",
              type: "list",
              message:
                "What role would you like to assign to a new department?",
              choices:  results,
            },
            {
              name: "employee_id",
              type: "list",
              message: "What department does this role belong to?",
              choices: employeeData,
            },
          ])
          .then((answers) => {
          
            db.query(`UPDATE employee set role_id = ? WHERE id = ?`, [
              answers.role,
               answers.employee_id,
            ]);
            console.log(
              answers.role +
                " now belongs to the " +
                answers.employee_id +
                " department."
            );
            start();
          });
      }
    );
  });
};

module.exports = { update };
