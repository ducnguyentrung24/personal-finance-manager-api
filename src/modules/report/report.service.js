const mongoose = require('mongoose');

const Transaction = require('../transaction/transaction.model');
const ApiError = require('../../utils/ApiError');

exports.getDashboardReport = async (userId) => {
    const result = await Transaction.aggregate([
        {
            $match: {
                userId: new mongoose.Types.ObjectId(userId)
            }
        },
        {
            $lookup: {
                from: 'categories',
                localField: 'categoryId',
                foreignField: '_id',
                as: 'category'
            }
        },
        {
            $unwind: '$category'
        },
        {
            $group: {
                _id: '$category.type',
                total: { $sum: '$amount' }
            }
        }
    ]);

    let totalIncome = 0;
    let totalExpense = 0;

    result.forEach(item => {
        if (item._id === 'income') totalIncome = item.total;
        if (item._id === 'expense') totalExpense = item.total;
    });

    return {
        totalIncome,
        totalExpense,
        balance: totalIncome - totalExpense
    }
};

exports.getMonthlyReport = async (userId) => {
    const result = await Transaction.aggregate([
        {
            $match: {
                userId: new mongoose.Types.ObjectId(userId)
            }
        },
        {
            $lookup: {
                from: 'categories',
                localField: 'categoryId',
                foreignField: '_id',
                as: 'category'
            }
        },
        {
            $unwind: '$category'
        },
        {
            $group: {
                _id: {
                    month: {
                        $dateToString: {
                            format: "%Y-%m",
                            date: "$date"
                        }
                    },
                    type: '$category.type'
                },
                total: { $sum: '$amount' }
            }
        },
        {
            $group: {
                _id: '$_id.month',
                income: {
                    $sum: {
                        $cond: [
                            { $eq: ['$_id.type', 'income'] },
                            '$total',
                            0
                        ]
                    }
                },
                expense: {
                    $sum: {
                        $cond: [
                            { $eq: ['$_id.type', 'expense'] },
                            '$total',
                            0
                        ]
                    }
                }
            }
        },
        {
            $project: {
                month: '$_id',
                income: 1,
                expense: 1
            }
        },
        {
            $sort: { month: 1 }
        }
    ]);

    return result;
};

exports.getTopExpenseCategories = async (userId) => {
    const result = await Transaction.aggregate([
        {
            $match: {
                userId: new mongoose.Types.ObjectId(userId)
            }
        },
        {
            $lookup: {
                from: 'categories',
                localField: 'categoryId',
                foreignField: '_id',
                as: 'category'
            }
        },
        {
            $unwind: '$category'
        },
        {
            $match: {
                'category.type': 'expense'
            }
        },
        {
            $group: {
                _id: '$category.name',
                total: { $sum: '$amount' },
            }
        },
        {
            $project: {
                _id: 0,
                category: '$_id',
                total: 1
            }
        },
        {
            $sort: { total: -1 }
        },
        {
            $limit: 5
        }
    ]);

    return result;
};