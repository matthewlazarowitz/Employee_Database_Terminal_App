const connection = require('./connection');

function getAllDepartments() {
    return connection.query('SELECT * FROM department');
  }
  
  function getAllRoles() {
    return connection.query('SELECT * FROM role');
  }
  
  function getAllEmployees() {
    return connection.query('SELECT * FROM employee');
  }


  function addDepartment(department) {
    return connection.query('INSERT INTO department SET ?', department);
  }
  

  function addRole(role) {
    return connection.query('INSERT INTO role SET ?', role);
  }
  
  
  function addEmployee(employee) {
      return connection.query('INSERT INTO employee SET ?', employee);
    }

  function updateEmployeeRole(employeeId, roleId) {
        return connection.query('UPDATE employee SET role_id = ? WHERE id = ?', [roleId, employeeId]);
      }
      
    module.exports = {
        getAllDepartments,
        getAllRoles,
        getAllEmployees,
        addDepartment,
        addRole,
        addEmployee,
        updateEmployeeRole
      };