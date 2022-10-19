const inquirer = require('inquirer');
const fs = require('fs');
const mysql = require('mysql2');
const cTable = require('console.table');



//  db = createConnection(config)
//  db = create(config)
// db.query(statement)
// db.close() ? .end()?
// db.query() // this will not work

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // MySQL password
    password: 'Vikings123$',
    database: 'company_db'
  },
  console.log(`Connected to the company_db database.`)
);



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
      // console.log(data.initialCommand)

      if(data.initialCommand === 'view_all_departments'){
        console.log('correct target')
        
        db.query('SELECT * from department', function (err, results) {
          console.table(results);
        })
      
      }

    })

}





function init() {
  initData()
  //for now, will fill later with logic



 }


init()