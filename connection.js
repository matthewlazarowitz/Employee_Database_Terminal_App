const mysql = require('mysql2');
const isProduction = process.env.NODE_ENV === 'production';

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'employee_db'
});

module.exports = connection.promise();
