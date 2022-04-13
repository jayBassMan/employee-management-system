var inquirer = require("inquirer");
const connection = require("../config/connection");
const first = require("../server");


const update = (db, start) => {
  db.query(
    "SELECT title as name, id as value FROM role",
    (err, results) => {
      if (err) throw err;
      inquirer
        .prompt([
          {
            name: "role",
            type: "list",
            message: "What role would you like to assign to a new department?",
            choices: () => results[0].map((result) => result.title),
          },
          {
            name: "department",
            type: "list",
            message: "What department does this role belong to?",
            choices: () => results[1].map((result) => result.name),
          },
        ])
        .then((answers) => {
          let roleID = results[0].filter(
            (result) => result.title === answers.role
          )[0].id;
          let department = results[1].filter(
            (result) => result.name === answers.department
          )[0].id;
          db.query(`UPDATE role set department_id = ? WHERE id = ?`, [
            department,
            role_id,
          ]);
          console.log(
            answers.role +
              " now belongs to the " +
              answers.department +
              " department."
          );
          start();
        });
    }
  );
};


module.exports = { update };