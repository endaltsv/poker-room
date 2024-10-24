// src/controllers/userController.js
const userService = require('../services/userService');

exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await userService.getAllUsers();
        res.status(200).json({ success: true, data: users });
    } catch (error) {
        next(error);
    }
};


const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.authUser = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const isMatch = await user.matchPassword(password);

        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        sendTokenResponse(user, 200, res);
    } catch (error) {
        next(error);
    }
};

const sendTokenResponse = (user, statusCode, res) => {
    const token = user.getSignedJwtToken();

    const options = {
        expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // Куки действуют 30 дней
        httpOnly: true,  // Куки недоступны через JavaScript
        secure: process.env.NODE_ENV === 'production',  // Только по HTTPS в продакшене
        sameSite: 'Strict', // Защита от CSRF
    };

    res.status(statusCode)
       .cookie('token', token, options)  // Установка куки
       .json({ success: true, token });
};


exports.createUser = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        user = new User({
            name,
            email,
            password,
        });

        await user.save();

        res.status(201).json({ success: true, data: user });
    } catch (error) {
        next(error);
    }
};