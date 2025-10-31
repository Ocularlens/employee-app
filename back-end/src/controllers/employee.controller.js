const { EmployeeModel } = require('../models');
const { SUCCESS } = require('../config/defaults.config');
const { Op } = require('sequelize');

const getAllEmployees = async (req, res) => {
  try {
    let {
      searchKeyword,
      size,
      page,
      order,
      field
    } = req.body;

    size = size || 10;
    page = page || 1;
    order = order || 'asc';
    field = field || 'id';

    const employeeCount = await EmployeeModel.findAndCountAll({
      where: searchKeyword ? {
        [Op.or]: {
          firstname: { [Op.like]: `%${searchKeyword}%` },
          lastname: { [Op.like]: `%${searchKeyword}%` },
          username: { [Op.like]: `%${searchKeyword}%` },
          email: { [Op.like]: `%${searchKeyword}%` }
        }
      } : {}
    });

    const data = await EmployeeModel.findAll({
      where: searchKeyword ? {
        [Op.or]: {
          firstname: { [Op.like]: `%${searchKeyword}%` },
          lastname: { [Op.like]: `%${searchKeyword}%` },
          username: { [Op.like]: `%${searchKeyword}%` },
          email: { [Op.like]: `%${searchKeyword}%` }
        }
      } : {},
      limit: size,
      offset: (page - 1) * size,
      order: [[field, order.toUpperCase()]]
    })

    return res.status(200).json({
      ...SUCCESS,
      employees: data,
      pagination: {
        totalItems: employeeCount.count,
        totalPages: Math.ceil(employeeCount.count / size),
        currentPage: page
      }
    });
  } catch (error) {
    throw error;
  }
};

const getEmployeeById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await EmployeeModel.findByPk(id)
    return res.status(200).json({
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

    employeeData.photo = req.file ? req.file.filename : null;

    if (req.file) {
      employeeData.photo = req.file.filename;
    }

    const isExisting = await employeeChecker(employeeData.email, employeeData.username);

    if (isExisting) {
      return res.status(400).json({
        status: 'error',
        message: 'Employee already exists.'
      });
    }

    await EmployeeModel.create(employeeData);

    return res.status(201).json(SUCCESS);
  } catch (error) {
    throw error;
  }
};

const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const employee = await EmployeeModel.findByPk(id);

    const isExisting = await employeeChecker(updatedData.email, updatedData.username, employee);

    if (isExisting) {
      return res.status(400).json({
        status: 'error',
        message: 'Employee already exists.'
      });
    }

    if (req.file) {
      updatedData.photo = req.file.filename;
    }

    await EmployeeModel.update(updatedData, { where: { id } });

    return res.status(200).json(SUCCESS);
  } catch (error) {
    throw error;
  }
};

const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    await EmployeeModel.destroy({ where: { id } });

    return res.status(200).json(SUCCESS);
  } catch (error) {
    throw error;
  }
};

const employeeChecker = async (email, username, employee) => {
  let isEmailExisting = await EmployeeModel.findOne({ where: { email } });
  let isUsernameExisting = await EmployeeModel.findOne({ where: { username } });

  if (employee) {
    isEmailExisting = isEmailExisting && isEmailExisting.id !== employee.id;
    isUsernameExisting = isUsernameExisting && isUsernameExisting.id !== employee.id;
  }

  return isEmailExisting || isUsernameExisting;
}

module.exports = {
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};