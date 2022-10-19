const inquirer = require('inquirer');
const fs = require('fs');
const mysql = require('mysql2');
const cTable = require('console.table');



// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'Vikings123$',
    database: 'company_db'
  },
  console.log(`Connected to the company_db database.`)
);



function loadMainPrompts() {
  inquirer
    .prompt([
      {
        type: 'list',
        message: 'What would you like to do?',
        name: 'choice',
        choices: ['view_all_departments', 'view_all_roles', 'view_all_employees', 'add_a_department', 'add_a_role', 'add_an_employee', 'update_an_employee_role'],
      },

    ])
    .then(data => {
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

              // case "add_an_employee":
              //   addEmployee();
              //   break;
    

      }
    })

}







function viewDepartments() {
  db.query('SELECT * from department', function (err, results) {
    console.table(results);
    //get results, extract id's,
    loadMainPrompts();
  })
}

function viewRoles() {
  db.query('SELECT * from role', function (err, results) {
    console.table(results);
    loadMainPrompts();
  })
}

function viewEmployees() {
  db.query('SELECT * from employee', function (err, results) {
    console.table(results);
    loadMainPrompts();
  })
}

function addDeparment() {
 inquirer
 .prompt([
  {
    message: 'What is the department name?',
    name: 'newDepartment',
  }])
  .then(data => { 
    db.query(`INSERT INTO department (name) VALUES ("${data.newDepartment}");`, function (err, results) {
      err ?  console.log("error", err) : console.log("successfully added")
      loadMainPrompts();
  })

})
}

function addRole() {
    db.query('SELECT * from department', function (err, results) {
      console.log(results);
      const IDarray = results.map( department => department.id)
      //get results, extract id's,

      inquirer
      .prompt([
        
       {
         message: 'What is the title of the new role?',
         name: 'newRoleTitle',
       },
       {
        message: 'What is the salary of the new role?',
        name: 'newRoleSalary',
      },
      {
        type: 'list',
        message: 'Which departmentID is the new role in?',
        name: 'newRoleDepartment',
        choices: IDarray

        //run view all departments
      },
      
      ])
      .then(data => { 
        db.query(`INSERT INTO role (title, salary, department_id) VALUES ("${data.newRoleTitle}", "${data.newRoleSalary}", "${data.newRoleDepartment}" );`, function (err, results) {
          err ?  console.log("error", err) : console.log("successfully added")
          loadMainPrompts();
      })
   
    })
  })
 }

//  function addEmployee() {
//   inquirer
//   .prompt([
//    {
//      message: 'What is the department name?',
//      name: 'newDepartment',
//    }])
//    .then(data => { 
//      db.query(`INSERT INTO department (name) VALUES ("${data.newDepartment}");`, function (err, results) {
//        err ?  console.log("error", err) : console.log("successfully added")
//        loadMainPrompts();
//    })
 
//  })
//  }







function init() {
  loadMainPrompts()
  //for now, will fill later with logic



}


init()