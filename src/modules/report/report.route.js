const express = require('express');
const router = express.Router();

const reportController = require('./report.controller');
const authMiddleware = require('../../middlewares/auth.middleware');

router.get('/dashboard', authMiddleware, reportController.getDashboardReport);
router.get('/monthly', authMiddleware, reportController.getMonthlyReport);
router.get('/top-expense-categories', authMiddleware, reportController.getTopExpenseCategories);
router.get('/export-excel', authMiddleware, reportController.exportReport);

module.exports = router;