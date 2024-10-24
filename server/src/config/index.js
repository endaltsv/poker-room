// src/config/index.js
require('dotenv').config();
const connectDB = require('./db');

const initConfig = async () => {
    await connectDB();
};

module.exports = initConfig;
