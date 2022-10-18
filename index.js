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
    
    ])
    .then((data) => {
      console.log(data.initialCommand)

      if(data.initialCommand === 'view_all_departments'){
        console.log('correct target')
        
      
      }

    })

}





function init() {
  initData()
  //for now, will fill later with logic



 }


init()