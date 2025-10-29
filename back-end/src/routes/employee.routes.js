const { Router } = require('express');
const {
  getAllEmployees,
  // getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} = require('../controllers/employee.controller');

const router = Router();

router.post('/getEmployees', getAllEmployees);
// router.post('/employees/:id', getEmployeeById);
router.post('/employees', createEmployee);
router.put('/employees/:id', updateEmployee);
router.delete('/employees/:id', deleteEmployee);

module.exports = router;