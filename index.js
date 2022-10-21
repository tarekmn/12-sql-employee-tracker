// pacakge requirements
const inquirer = require("inquirer");
const fs = require("fs");
const mysql = require("mysql2");
const cTable = require("console.table");
const db = require("./Assets/js/connection");

//main prompt questions
function loadMainPrompts() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "What would you like to do?",
        name: "choice",
        choices: [
          "view_all_departments",
          "view_all_roles",
          "view_all_employees",
          "add_a_department",
          "add_a_role",
          "add_an_employee",
          "update_an_employee_role",
          "EXIT",
        ],
      },
    ])
    .then((data) => {
      let choice = data.choice;

      switch (choice) {
        case "view_all_departments":
          viewDepartments();
          break;
        case "view_all_roles":
          viewRoles();
          break;
        case "view_all_employees":
          viewEmployees();
          break;
        case "add_a_department":
          addDeparment();
          break;
        case "add_a_role":
          addRole();
          break;
        case "add_an_employee":
          addEmployee();
          break;
        case "update_an_employee_role":
          updateEmployee();
          break;
        case "EXIT":
          process.exit();
          break;
      }
    });
}

function viewDepartments() {
  db.query("SELECT * from department", function (err, results) {
    console.table(results);
    loadMainPrompts(); //reruns the prompts on all remaining functions
  });
}

function viewRoles() {
  db.query("SELECT * from role", function (err, results) {
    console.table(results);
    loadMainPrompts();
  });
}

function viewEmployees() {
  db.query(
    `SELECT employee.id AS id, employee.first_name AS first_name, 
  employee.last_name AS last_name, 
  role.title AS title, 
  role.department_id AS department_id , 
  role.salary AS salary, employee.manager_id AS manager_id
  FROM employee
  INNER JOIN role ON role.id = employee.role_id
  INNER JOIN department ON department.id = role.department_id;`,
    function (err, results) {
      console.table(results);
      loadMainPrompts();
    }
  );
}

function addDeparment() {
  inquirer
    .prompt([
      {
        message: "What is the department name?",
        name: "newDepartment",
      },
    ])
    .then((data) => {
      db.query(
        `INSERT INTO department (name) VALUES ("${data.newDepartment}");`,
        function (err, results) {
          err ? console.log("error", err) : console.log("successfully added");
          loadMainPrompts();
        }
      );
    });
}

function addRole() {
  db.query("SELECT * from department", function (err, results) {
    console.table(results);
    const IDarray = results.map((department) => department.id); //creates array of department ids

    inquirer
      .prompt([
        {
          message: "What is the title of the new role?",
          name: "newRoleTitle",
        },
        {
          message: "What is the salary of the new role?",
          name: "newRoleSalary",
        },
        {
          type: "list",
          message: "Which departmentID is the new role in?",
          name: "newRoleDepartment",
          choices: IDarray,
        },
      ])
      .then((data) => {
        db.query(
          `INSERT INTO role (title, salary, department_id) VALUES ("${data.newRoleTitle}", "${data.newRoleSalary}", "${data.newRoleDepartment}" );`,
          function (err, results) {
            err ? console.log("error", err) : console.log("successfully added");
            loadMainPrompts();
          }
        );
      });
  });
}

function addEmployee() {
  db.query("SELECT * from role", function (err, results) {
    const rIDarray = results.map((role) => role.id);

    inquirer
      .prompt([
        {
          message: "What is the employee's first name?",
          name: "first_name",
        },
        {
          message: "What is the employee's last name?",
          name: "last_name",
        },
        {
          type: "list",
          message: "Which roleID is the new role in?",
          name: "roleID",
          choices: rIDarray,
        },
        {
          type: "list",
          message: "Which managerID is the new role in?",
          name: "managerID",
          choices: [1, 2, 3, 4, 5, 6, 7],
        },
      ])
      .then((data) => {
        db.query(
          `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${data.first_name}", "${data.last_name}", "${data.roleID}", "${data.managerID}" );`,
          function (err, results) {
            err ? console.log("error", err) : console.log("successfully added");
            loadMainPrompts();
          }
        );
      });
  });
}

function updateEmployee() {
  db.query("SELECT * from employee", function (err, results) {
    const employeeArray = results.map((employee) => employee.first_name);

    inquirer
      .prompt([
        {
          type: "list",
          message: "Which employee would you like to update?",
          name: "employeeToUpdate",
          choices: employeeArray,
        },
        {
          type: "list",
          message: "What is the employee's new role?",
          name: "employeeNewRole",
          choices: [1, 2, 3, 4, 5, 6],
        },
      ])
      .then((data) => {
        db.query(
          `UPDATE employee
          SET role_id = ${data.employeeNewRole}
          WHERE first_name = '${data.employeeToUpdate}';`,
          function (err, results) {
            err ? console.log("error", err) : console.log("successfully added");
            loadMainPrompts();
          }
        );
      });
  });
}

function init() {
  loadMainPrompts();
}

init();
