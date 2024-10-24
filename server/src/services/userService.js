// src/services/userService.js
const User = require('../models/User');

exports.getAllUsers = async () => {
    return await User.find().select('-password'); 
};

exports.createUser = async (userData) => {
    const user = new User(userData);
    return await user.save();A
};
