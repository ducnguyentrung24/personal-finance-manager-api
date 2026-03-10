const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const errorMiddleware = require('./middlewares/error.middleware');
const authRoutes = require('./modules/auth/auth.route');
const userRoutes = require('./modules/user/user.route');
const categoryRoutes = require('./modules/category/category.route');
const transactionRoutes = require('./modules/transaction/transaction.route');
const reportRoutes = require('./modules/report/report.route');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/categories', categoryRoutes);
app.use('/transactions', transactionRoutes);
app.use('/reports', reportRoutes);

// Test route
app.get('/', (req, res) => {
    res.send('Welcome to the Personal Finance API');
});

// Error handling middleware
app.use(errorMiddleware);

module.exports = app;