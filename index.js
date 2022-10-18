const inquirer = require('inquirer');
const fs = require('fs');
const mysql = require('mysql2');


function initData() {
  return inquirer
    .prompt([
      {
        type: 'list',
        message: 'What would you like to do?',
        name: 'initialCommand',
        choices: ['view_all_departments', 'view_all_roles', 'add_a_department', 'add_a_role', 'add_an_employee', 'update_an_employee_role'],
      },
      // {
      //   type: 'input',
      //   message: 'What is the employee name?',
      //   name: 'name',
      // },
      // {
      //   type: 'input',
      //   message: 'What is the employee ID?',
      //   name: 'employeeID',
      // },
      // {
      //   type: 'input',
      //   message: 'What is the email address?',
      //   name: 'email',
      // }

    ])
    .then((response) => {
      console.log(response.initialCommand)
    })

}





function init() {
  initData()




 }


init()