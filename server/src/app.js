// src/app.js
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

app.use(cors()); 
app.use(cookieParser());
app.use(express.json());

const userRoutes = require('./routes/users');
app.use('/api/users', userRoutes);

app.use(errorHandler);

module.exports = app;
