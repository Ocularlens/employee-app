const { Sequelize, DataTypes } = require('sequelize');

const EmployeeModel = (sequelize) => {
  const Employee = sequelize.define('Employee', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    tableName: 'employees',
    timestamps: false,
  });

  return Employee;
};

module.exports = EmployeeModel;