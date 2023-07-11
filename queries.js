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