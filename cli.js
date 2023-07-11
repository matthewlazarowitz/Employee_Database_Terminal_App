const inquirer = require('inquirer');
const {
  getAllDepartments,
  getAllRoles,
  getAllEmployees,
  addDepartment,
  addRole,
  addEmployee,
  updateEmployeeRole
} = require('./queries');

function mainMenu() {
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'action',
          message: 'What would you like to do?',
          choices: [
            'View all departments',
            'View all roles',
            'View all employees',
            'Add a department',
            'Add a role',
            'Add an employee',
            'Update an employee role',
            'Exit'
          ]
        }
      ])
      .then((answer) => {
        switch (answer.action) {
          case 'View all departments':
            viewAllDepartments();
            break;
          case 'View all roles':
            viewAllRoles();
            break;
          case 'View all employees':
            viewAllEmployees();
            break;
          case 'Add a department':
            promptAddDepartment();
            break;
          case 'Add a role':
            promptAddRole();
            break;
          case 'Add an employee':
            promptAddEmployee();
            break;
          case 'Update an employee role':
            promptUpdateEmployeeRole();
            break;
          case 'Exit':
            console.log('Goodbye!');
            process.exit(0);
        }
      });
  }

  function viewAllDepartments() {
    getAllDepartments()
      .then(([rows]) => {
        console.table(rows);
        mainMenu();
      })
      .catch((err) => console.error(err));
  }

  function viewAllRoles() {
    getAllRoles()
      .then(([rows]) => {
        console.table(rows);
        mainMenu();
      })
      .catch((err) => console.error(err));
  }
  
  function viewAllEmployees() {
    getAllEmployees()
      .then(([rows]) => {
        console.table(rows);
        mainMenu();
      })
      .catch((err) => console.error(err));
  }

  function promptAddDepartment() {
    inquirer
      .prompt([
        {
          name: 'name',
          message: 'Enter the name of the department:',
        }
      ])
      .then((answer) => {
        addDepartment(answer)
          .then(() => {
            console.log('Department added successfully!');
            mainMenu();
          })
          .catch((err) => console.error(err));
      });
  }