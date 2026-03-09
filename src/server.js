require('dotenv').config();
const connectDB = require('./config/db');

const app = require('./app');

const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});