const transactionService = require('./transaction.service');
const { successResponse } = require('../../utils/response');

exports.getTransactions = async (req, res, next) => {
    try {
        const result = await transactionService.getTransactions(req.user._id, req.query);

        return successResponse(res, result, "Transaction list");
    } catch (error) {
        next(error);
    }
};

exports.createTransaction = async (req, res, next) => {
    try {
        const transaction = await transactionService.createTransaction(req.user._id, req.body);

        return successResponse(res, transaction, "Transaction created successfully", 201);
    } catch (error) {
        next(error);
    }
};

exports.updateTransaction = async (req, res, next) => {
    try {
        const transaction = await transactionService.updateTransaction(
            req.user._id, 
            req.params.id, 
            req.body
        );

        return successResponse(res, transaction, "Transaction updated successfully");
    } catch (error) {
        next(error);
    }
};

exports.deleteTransaction = async (req, res, next) => {
    try {
        await transactionService.deleteTransaction(req.user._id, req.params.id);

        return successResponse(res, null, "Transaction deleted successfully");
    } catch (error) {
        next(error);
    }
};