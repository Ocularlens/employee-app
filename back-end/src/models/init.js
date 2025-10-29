const Sequelize = require('sequelize');
const { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USER } = require('../config/database.config');
const EmployeeModel = require('./employee.model');

const initDatabase = () => {
  const sequelize = new Sequelize({
    host: DB_HOST,
    port: DB_PORT,
    database: DB_NAME,
    username: DB_USER,
    password: DB_PASSWORD,
    dialect: 'mysql',
  });

  EmployeeModel(sequelize);

  return sequelize;
}

module.exports = initDatabase;