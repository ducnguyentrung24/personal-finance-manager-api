const express = require('express');
const router = express.Router();

const categoryController = require('./category.controller');
const authMiddleware = require('../../middlewares/auth.middleware');

router.post('/', authMiddleware, categoryController.createCategory);
router.get('/', authMiddleware, categoryController.getCategories);
router.patch('/:id', authMiddleware, categoryController.updateCategory);
router.delete('/:id', authMiddleware, categoryController.deleteCategory);

module.exports = router;