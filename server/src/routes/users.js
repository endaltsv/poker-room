// src/routes/users.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { protect } = require('../middlewares/authMiddleware');

router.get('/', protect, userController.getAllUsers);
router.post('/', userController.createUser);
router.post('/auth', userController.authUser);

module.exports = router;
