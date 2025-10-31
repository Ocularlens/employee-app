const { Router } = require('express');
const { login } = require('../controllers/auth.controller');
const validate = require('../middlewares/validation.middleware');
const { loginSchema } = require('../schemas/auth.schema');

const router = Router();

router.post('/login', validate(loginSchema), login);

module.exports = router;