const mongoose = require('mongoose');
const ExcelJS = require('exceljs');

const Transaction = require('../transaction/transaction.model');

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

exports.exportTransactionsToExcel = async (userId) => {
    const transactions = await Transaction.aggregate([
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
        }
    ]);

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Transactions');

    worksheet.columns = [
        {
            header: 'Date',
            key: 'date',
            width: 15,
            style: { alignment: { horizontal: 'center' } }
        },
        {
            header: 'Category',
            key: 'category',
            width: 20,
            style: { alignment: { horizontal: 'center' } }
        },
        {
            header: 'Type',
            key: 'type',
            width: 15,
            style: { alignment: { horizontal: 'center' } }
        },
        {
            header: 'Amount',
            key: 'amount',
            width: 20,
            style: { alignment: { horizontal: 'center' } }
        },
        {
            header: 'Note',
            key: 'note',
            width: 30,
            style: { alignment: { horizontal: 'center' } }
        }
    ];

    transactions.forEach(t => {
        worksheet.addRow({
            date: new Date(t.date),
            category: t.category.name,
            type: t.category.type,
            amount: t.amount,
            note: t.note || ''
        });
    });

    const headerRow = worksheet.getRow(1);
    headerRow.font = { bold: true };
    headerRow.alignment = {
        vertical: 'middle',
        horizontal: 'center'
    };

    worksheet.getColumn('date').numFmt = 'dd/mm/yyyy';
    worksheet.getColumn('amount').numFmt = '#,##0';

    return workbook;
};