const { EmployeeModel } = require('../models');
const { SUCCESS } = require('../config/defaults.config');

const getAllEmployees = async (req, res) => {
  // Logic to get all employees
  try {
    const data = await EmployeeModel.findAll()

    return res.status(200).json({
      ...SUCCESS,
      employees: data
    });
  } catch (error) {
    throw error;
  }
};

const getEmployeeById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await EmployeeModel.findByPk(id)
    res.status(200).json({
      ...SUCCESS,
      employee: data
    });
  } catch (error) {
    throw error;
  }
};

const createEmployee = async (req, res) => {
  try {
    const employeeData = req.body;
    await EmployeeModel.create(employeeData)

    return res.status(201).json(SUCCESS);
  } catch (error) {
    throw error;
  }
};

const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    await EmployeeModel.update(updatedData, { where: { id } });

    res.status(200).json(SUCCESS);
  } catch (error) {
    throw error;
  }
};

const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    await EmployeeModel.destroy({ where: { id } });

    res.status(200).json(SUCCESS);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};