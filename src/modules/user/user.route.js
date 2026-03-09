const express = require('express');
const router = express.Router();

const userController = require('./user.controller');
const authMiddleware = require('../../middlewares/auth.middleware');
const authorize = require('../../middlewares/authorize.middleware');

router.get('/', authMiddleware, authorize('admin'), userController.getUsers);

module.exports = router;