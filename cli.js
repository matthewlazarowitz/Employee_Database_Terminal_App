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

  function promptAddRole() {
    inquirer
      .prompt([
        {
          name: 'title',
          message: 'Enter the title of the role:',
        },
        {
          name: 'salary',
          message: 'Enter the salary for the role:',
          validate: (value) => {
            if (isNaN(value)) {
              return 'Please enter a valid salary';
            }
            return true;
          }
        },
        {
          name: 'department_id',
          message: 'Enter the department ID for the role:',
          validate: (value) => {
            if (isNaN(value)) {
              return 'Please enter a valid department ID';
            }
            return true;
          }
        }
      ])
      .then((answer) => {
        addRole(answer)
          .then(() => {
            console.log('Role added successfully!');
            mainMenu();
          })
          .catch((err) => console.error(err));
      });
  }

  function promptAddEmployee() {
    inquirer
      .prompt([
        {
          name: 'first_name',
          message: 'Enter the first name of the employee:',
        },
        {
          name: 'last_name',
          message: 'Enter the last name of the employee:',
        },
        {
          name: 'role_id',
          message: 'Enter the role ID for the employee:',
          validate: (value) => {
            if (isNaN(value)) {
              return 'Please enter a valid role ID';
            }
            return true;
          }
        },
        {
          name: 'manager_id',
          message: 'Enter the manager ID for the employee (leave empty if none):',
          validate: (value) => {
            if (value !== '' && isNaN(value)) {
              return 'Please enter a valid manager ID or leave it empty';
            }
            return true;
          }
        }
      ])
      .then((answer) => {
        
        const managerId = answer.manager_id === '' ? null : answer.manager_id;
  
        const employee = {
          first_name: answer.first_name,
          last_name: answer.last_name,
          role_id: answer.role_id,
          manager_id: managerId
        };
  
        addEmployee(employee)
          .then(() => {
            console.log('Employee added successfully!');
            mainMenu();
          })
          .catch((err) => console.error(err));
      });
  }