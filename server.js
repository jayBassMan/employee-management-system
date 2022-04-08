const express = require('express');
const path = require('path');
const inquirer = require('inquirer');
const sequelize = require("./config/connection");
require('dotenv').config()

// Import and require mysql2
const mysql = require('mysql2');
const api = require("./routes/index")


const PORT = process.env.PORT || 3001;
const app = express();

// turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));
app.use("/api", api);

app.get("/", (req, res) => res.send("Navigate to /send or /routes"));
app.get("/index", (req, res) => {
	// responds by sending a specified html file to the request
	res.sendFile(path.join(__dirname, "public/index.html"));
});



// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // MySQL password
    password: 'Password123!',
    database: 'Company_db'
  },
  console.log(`Connected to the Company_db database.`)
);

const start = () => {
  inquirer.prompt({
    name: "action",
    type: "list",
    message: "What would you like to do?",
    choices: [
      "View all department.",
      "View all roles.",
      "View all employees.",
      "Add a department.",
      "Add a role.",
      "Add an employee.",
      "Update an employee role",
      "Exit.",
    ],
  })
  .then = ((answer) => {
    switch (answer.action) {
      case 'View all department.':
        //viewAllDepartment() function
        viewAllDepartment()
        break;
      case 'View all roles.':
        //viewAllRoles() function
        viewAllRoles()
        break;
      case 'View all employees.':
        //viewAllEmployees() function
        viewAllEmployees()
        break;
      case 'Add a department':
        //addADepartment() function
        addADepartment()
        break;
      case 'Add a role.':
        //addARole() function
        addARole()
        break;
      case 'Add an employee.':
        //addAnEmployee() function
        addAnEmployee()
        break;
      case 'Update an employee role':
        //addDepartment() function
        break;
      case 'Exit.':
        db.end()
        //addDepartment() function
        break;
    }
  })

  // functions
    const viewAllDepartment = () => {
    // Render department table
    db.query("SELECT * FROM departments", (req, res) => {
      if (req) throw req;
      console.table(res);
      start();
    });
  }

    const viewAllRoles = () => {
    // Render employee table
    db.query("SELECT * FROM role", (err, results) => {
      if (err) throw err;
      console.table(results);
      start();
    });
  }

    const viewAllEmployees = () => {
    db.query(
      `SELECT 
      `,
      (err, results) => {
        if (err) throw err;
        console.table(results);
        start();
      }
    );
  }

    const addADepartment = () => {
    inquirer
      .prompt({
        name: "department",
        type: "input",
        message: "Please enter the name of the department you would like to add?",
      })
      .then(function (answer) {
        db.query(
          "INSERT INTO departments SET ?",
          {
            name: answer.department,
          },
          function (err) {
            if (err) throw err;
            console.log(
              answer.department + " department has been successfully added"
            );
            // Return to the beginning
            start();
          }
        );
      });
  }

    function addARole() {
    inquirer
      .prompt([
        {
          name: "role",
          type: "input",
          message: "Please enter the title of the role you like to add?",
        },
        {
          name: "salary",
          type: "input",
          message: "Please enter the salary of the role.",
          validate: validateNumber,
        },
      ])
      .then(function (answers) {
        db.query(
          "INSERT INTO role SET ?",
          {
            title: answers.role,
            salary: answers.salary,
          },
          function (err) {
            if (err) throw err;
            console.log(answers.role + " has been successfully added to roles.");
            // Return to the beginning
            start();
          }
        );
      });
  }

    const addAnEmployee = () => {
    db.query("SELECT * FROM role", (err, results) => {
      if (err) throw err;
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
            choices: () => results.map((result) => result.title),
          },
          {
            name: "manager_id",
            type: "input",
            message: "Please enter manager id?",
          },
        ])
        .then((answers) => {
          answers.role = results.filter(
            (result) => result.title === answers.role
          )[0].id;
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
    });
  }
}

