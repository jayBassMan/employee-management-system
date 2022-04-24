var inquirer = require("inquirer");
const connection = require("../config/connection");
const first = require("../server");

const addADepartment = (db, start) => {
  inquirer
    .prompt([
      {
        name: "department",
        type: "input",
        message:
          "Please enter the name of the department you would like to add?",
      },
    ])
    .then((answers) => {
      db.query(
        `INSERT INTO department (name) values ('${answers.department}') `,
        // [
        //   answers.department,
        // ],
        (err) => {
          if (err) throw err;
          console.log(answers.department + " successfully added department ");
          // Return to the beginning
          start();
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
// const addARole = (db, start) => {
  // because a role belongs to a department, we need to know all the departments available to add this role to.
  //first we need to get all the departments as a list to use in inquirer as a list for choices to be selected
  // then we ask the role questions -- title, salary, and which department
  //then we know title salary and department id and can insert those values into the role table
  // db.query("SELECT title as name, id as value FROM role", (err, results) => {
  //   if (err) throw err;

  //   db.query(
  //     "SELECT concat(title) as name, id as value from employee",
//   //     (err, employeeData) => {
//         inquirer
//           .prompt([
//             {
//               name: "title",
//               type: "input",
//               message: "Please enter the title of the role you like to add?",
//             },
//             {
//               name: "salary",
//               type: "input",
//               message: "Please enter the salary of the role.",
//             },
//             {
//               name: "department_id",
//               type: "list",
//               message: "Please enter the department_id.",
//               choices: 
//             },
//           ])
//           .then((answers) => {
//             db.query(
//               "INSERT INTO role SET ?",
//               {
//                 title: answers.title,
//                 salary: answers.salary,
//                 department_id: answers.department_id,
//               },
//               (err) => {
//                 if (err) throw err;
//                 console.log(
//                   answers.title + " successfully added Role. " + answers.role
//                 );
//                 // Return to the beginning
//                 start();
//               }
//             );
//           });
//       }
//     );
//   });
// };
// ------------------------------------------------------------------------------
function addARole(db, start) {
  db.query('SELECT name , id as value FROM department', function(err, data) {


  inquirer
    .prompt([
      {
        name: "title",
        type: "input",
        message: "What is the title of the new role?",
      },
      {
        name: "salary",
        type: "input",
        message: "What is the salary?",
      },
      {
        name: "department_id",
        type: "list",
        message:
          "What is the Department ID for this new role? Please select 1 for Sales, 2 for Engineering, 3 for Finance, 4 for Legal.",
        choices: data
      },
    ])
    .then(function (answer) {
      var query =
        "INSERT INTO Role (title, salary, department_id) VALUES (?, ?, ?)";
      db.query(
        query,
        [answer.title, answer.salary, answer.department_id],
        function (err, res) {
          if (err) throw err;
          console.log(`Successfully Added Role: ${answer.title}`);
          start();
        }
      );
    });
    })
}
// ----------------------
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
//         "NSERT INTO employee SET" ,
//         // {
//         //   title: answers.role,
//         //   salary: answers.salary,
//         // },
//         function (err) {
//           if (err) throw err;
//           console.log(answers.salary + " has been successfully added to roles.");
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
              choices: employeeData,
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



