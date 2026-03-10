const reportService = require('./report.service');
const { successResponse } = require('../../utils/response');

exports.getDashboardReport = async (req, res, next) => {
    try {
        const report = await reportService.getDashboardReport(req.user._id);

        return successResponse(res, report, "Dashboard report");
    } catch (error) {
        next(error);
    }
};

exports.getMonthlyReport = async (req, res, next) => {
    try {
        const report = await reportService.getMonthlyReport(req.user._id);

        return successResponse(res, report, "Monthly report");
    } catch (error) {
        next(error);
    }
};

exports.getTopExpenseCategories = async (req, res, next) => {
    try {
        const report = await reportService.getTopExpenseCategories(req.user._id);

        return successResponse(res, report, "Top expense categories");
    } catch (error) {
        next(error);
    }
};

exports.exportReport = async (req, res, next) => {
    try {
        const workbook = await reportService.exportTransactionsToExcel(req.user._id);

        res.setHeader(
            'Content-Type', 
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        );

        res.setHeader(
            'Content-Disposition', 
            'attachment; filename=transactions_report.xlsx'
        );

        await workbook.xlsx.write(res);

        res.end();
    } catch (error) {
        next(error);
    }
};