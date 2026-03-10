const express = require('express');
const router = express.Router();

const authController = require('./auth.controller');
const authMiddleware = require('../../middlewares/auth.middleware');
const {
    registerSchema,
    loginSchema,
    changePasswordSchema,
    updateMeSchema
} = require('./auth.validate');
const { validate } = require('../../middlewares/validate.middleware');

router.post('/register', validate(registerSchema), authController.register);
router.post('/login', validate(loginSchema), authController.login);

router.get('/me', authMiddleware, authController.getMe);
router.patch('/me', authMiddleware, validate(updateMeSchema), authController.updateMe);

router.patch('/change-password', validate(changePasswordSchema), authMiddleware, authController.changePassword);

module.exports = router;