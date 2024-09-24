const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Register API
router.post('/register', authController.register);

// Email verify route
router.get('/verify-email/:token', authController.verifyEmail);

// Login API
router.post('/login', authController.login);

// Parolni tiklash uchun so'rov yuborish API
router.post('/request-password-reset', authController.requestPasswordReset);

// Parolni tiklash route
router.post('/reset-password/:token', authController.resetPassword);

module.exports = router;
