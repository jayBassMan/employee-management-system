const express = require('express');
const path = require('path');
const inquirer = require('inquirer');
const sequelize = require("./config/connection");
const add = require("./Add/add_inquirer")
const view = require("./view/view_inquirer")
const update = require("./update/update_inquirer")
require('dotenv').config()

// Import and require mysql2
const mysql = require('mysql2');



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
        view.viewAllDepartment()
        break;
      case 'View all roles.':
        //viewAllRoles() function
        view.viewAllRoles()
        break;
      case 'View all employees.':
        //viewAllEmployees() function
        view.viewAllEmployees()
        break;
      case 'Add a department':
        //addADepartment() function
        add.addADepartment()
        break;
      case 'Add a role.':
        //addARole() function
        add.addARole()
        break;
      case 'Add an employee.':
        //addAnEmployee() function
        add.addAnEmployee()
        break;
      case 'Update an employee role':
        //update() function
        update.update()
        break;
      case 'Exit.':
        //end()
        db.end()
        break;
    }
  })
}


exports.start = start;
start()