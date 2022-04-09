var inquirer = require("inquirer");
const connection = require("../config/connection");
const first = require("../server");



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

const addARole = () => {
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

module.exports = { addADepartment, addARole, addAnEmployee }
