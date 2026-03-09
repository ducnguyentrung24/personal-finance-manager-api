const express = require('express');
const router = express.Router();

const userController = require('./user.controller');
const authMiddleware = require('../../middlewares/auth.middleware');
const authorize = require('../../middlewares/authorize.middleware');

router.use(authMiddleware, authorize('admin'));

router.get('/', userController.getUsers);
router.get('/:id', userController.getUserById);
router.post('/', userController.createUser);
router.patch('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);
router.delete('/', userController.deleteManyUsers);
router.patch('/:id/lock', userController.lockUser);
router.patch('/:id/unlock', userController.unlockUser);

module.exports = router;