const { Router } = require('express');
const {
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} = require('../controllers/employee.controller');
const validate = require('../middlewares/validation.middleware');
const { employeeSchema, employeeSearchSchema, employeeUpdateSchema } = require('../schemas/employee.schema');

const router = Router();

router.post('/getEmployees', validate(employeeSearchSchema), getAllEmployees);
router.post('/employees/:id', getEmployeeById);
router.post('/employees', validate(employeeSchema), createEmployee);
router.put('/employees/:id', validate(employeeUpdateSchema), updateEmployee);
router.delete('/employees/:id', deleteEmployee);

module.exports = router;