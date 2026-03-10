const express = require('express');
const router = express.Router();

const authController = require('./auth.controller');
const authMiddleware = require('../../middlewares/auth.middleware');
const { registerSchema, loginSchema, changePassword } = require('./auth.validate');
const { validate } = require('../../middlewares/validate.middleware');

router.post('/register', validate(registerSchema), authController.register);
router.post('/login', validate(loginSchema), authController.login);

router.get('/me', authMiddleware, authController.getMe);

router.patch('/change-password', validate(changePassword), authMiddleware, authController.changePassword);

module.exports = router;