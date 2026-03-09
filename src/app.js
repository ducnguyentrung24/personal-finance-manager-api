const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const errorMiddleware = require('./middlewares/error.middleware');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));


// Test route
app.get('/', (req, res) => {
    res.send('Welcome to the Personal Finance API');
});

const User = require("./modules/user/user.model");

// Error handling middleware
app.use(errorMiddleware);

module.exports = app;