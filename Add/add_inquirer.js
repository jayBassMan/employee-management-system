var inquirer = require("inquirer");
const connection = require("../config/connection");
const first = require("../server");


const addADepartment = (db, start) => {
  db.query("SELECT department as name, id as value FROM role", (err, results) => {
    if (err) throw err;

    db.query(
      // '"SELECT department as name, id as value FROM role"',
      (err, data) => {
        
        inquirer
          .prompt([
            {
              name: "department",
              type: "input",
              message:
                "Please enter the name of the department you would like to add?",
                choices: data
            },
          ])
          .then((answers) => {
            db.query(
              "INSERT INTO department SET ?",
              {
                department: answers.department,
              },
              (err) => {
                if (err) throw err;
                console.log(
                  answers.department + " successfully added department "
                );
                // Return to the beginning
                start();
              }
            );
          });
      }
    );
  });
};

// const addADepartment = (db, start) => {
//   inquirer
//     .prompt({
//       name: "department",
//       type: "input",
//       message: "Please enter the name of the department you would like to add?",
//     })
//     .then(function (answer) {
//       db.query(
//         "INSERT INTO department SET ?",
//         {
//           name: answer.department,
//         },
//         function (err) {
//           if (err) throw err;
//           console.log(
//             answer.department + " department has been successfully added"
//           );
//           // Return to the beginning
//           start();
//         }
//       );
//     });
// };
const addARole = (db, start) => {
  db.query("SELECT title as name, id as value FROM role", (err, results) => {
    if (err) throw err;

    db.query(
      'SELECT concat(title) as name, id as value from employee',
      (err, employeeData) => {
        inquirer
          .prompt([
            {
              name: "title",
              type: "input",
              message: "Please enter the title of the role you like to add?",
            },
            {
              name: "salary",
              type: "input",
              message: "Please enter the salary of the role.",
            },
            {
              name: "department_id",
              type: "input",
              message: "Please enter the department_id.",
            }
          ])
          .then((answers) => {
            db.query(
              "INSERT INTO employee SET ?",
              {
                title: answers.title,
                salary: answers.salary,
                department_id: answers.department_id,
              },
              (err) => {
                if (err) throw err;
                console.log(
                  answers.title +
                    " successfully added Role. " +
                    answers.role
                );
                // Return to the beginning
                start();
              }
            );
          });
      }
    );
  });
};

// const addARole = (db, start) => {
//   inquirer
//     .prompt([
//       {
//         name: "role",
//         type: "input",
//         message: "Please enter the title of the role you like to add?",
//       },
//       {
//         name: "salary",
//         type: "input",
//         message: "Please enter the salary of the role.",
//       },
//     ])
//     .then(function (answers) {
//       db.query(
//         "INSERT INTO role SET ?",
//         {
//           title: answers.role,
//           salary: answers.salary,
//         },
//         function (err) {
//           if (err) throw err;
//           console.log(answers.role + " has been successfully added to roles.");
//           // Return to the beginning
//           start();
//         }
//       );
//     });
// };

const addAnEmployee = (db, start) => {
  db.query("SELECT title as name, id as value FROM role", (err, results) => {
    if (err) throw err;

    db.query(
      'SELECT concat(first_name," " ,last_name) as name, id as value from employee',
      (err, employeeData) => {
        inquirer
          .prompt([
            {
              name: "first_name",
              type: "input",
              message: "Please enter employees fist name?",
            },
            {
              name: "last_name",
              type: "input",
              message: "Please enter employees last name?",
            },
            {
              name: "employee_role",
              type: "list",

              message: "Please enter employee's role?",
              choices: results,
            },
            {
              name: "manager_id",
              type: "list",
              message: "Please enter manager id?",
              choices: employeeData
            },
          ])
          .then((answers) => {
           
            db.query(
              "INSERT INTO employee SET ?",
              {
                first_name: answers.first_name,
                last_name: answers.last_name,
                role_id: answers.employee_role,
                manager_id: answers.manager_id,
              },
              (err) => {
                if (err) throw err;
                console.log(
                  answers.firstName +
                    " " +
                    answers.lastName +
                    " successfully added to employee with the role of " +
                    answers.role
                );
                // Return to the beginning
                start();
              }
            );
          });
      }
    );
  });
};

module.exports = { addADepartment, addARole, addAnEmployee };
