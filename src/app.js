const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));


// Test route
app.get('/', (req, res) => {
    res.send('Welcome to the Personal Finance API');
});

module.exports = app;