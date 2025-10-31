const { Router } = require('express');
const authRoutes = require('./auth.routes');
const employeeRoutes = require('./employee.routes');
const authMiddleware = require('../middlewares/auth.middleware');

const router = Router();

router.use('/api/auth', authRoutes);
router.use('/api', authMiddleware, employeeRoutes);

module.exports = router;