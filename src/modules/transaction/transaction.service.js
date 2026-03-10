const Transaction = require('./transaction.model');
const Category = require('../category/category.model');
const ApiError = require('../../utils/ApiError')

exports.getTransactions = async (userId, query) => {
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 10;
    const skip = (page - 1) * limit;

    const filter = { userId };

    if (query.moth && query.year) {
        const startDate = new Date(query.year, query.month - 1, 1);
        const endDate = new Date(query.year, query.month, 0);

        filter.date = {
            $gte: startDate,
            $lte: endDate
        };
    }

    let sortOptions = { date: -1 };

    if (query.sort === 'amount') {
        sortOptions = { amount: -1 };
    }

    const transactions = await Transaction.find(filter)
        .skip(skip)
        .limit(limit)
        .sort(sortOptions)
        .populate('categoryId', 'name type');
    
    const total = await Transaction.countDocuments(filter);

    return {
        transactions,
        pagination: {
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit)
        }
    };
};

exports.createTransaction = async (userId, data) => {
    const { amount, categoryId, date, note } = data;

    const category = await Category.findOne({ _id: categoryId, userId });
    if (!category) {
        throw new ApiError(404, "Category not found");
    }

    const transaction = await Transaction.create({
        amount,
        categoryId,
        userId,
        date,
        note
    });

    return transaction;
};

exports.updateTransaction = async (userId, transactionId, data) => {
    const transaction = await Transaction.findOne({ _id: transactionId, userId });
    if (!transaction) {
        throw new ApiError(404, "Transaction not found");
    }

    if (data.categoryId) {
        const category = await Category.findOne({ _id: data.categoryId, userId });
        if (!category) {
            throw new ApiError(404, "Category not found");
        }
    }

    Object.assign(transaction, data);
    await transaction.save();

    return transaction;
};

exports.deleteTransaction = async (userId, transactionId) => {
    const transaction = await Transaction.findOneAndDelete({ _id: transactionId, userId });
    if (!transaction) {
        throw new ApiError(404, "Transaction not found");
    }

    return true;
};