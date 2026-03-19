const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Signup
router.post('/signup', authController.signup);

// Signin
router.post('/signin', authController.signin);

// Forgot password - send OTP
router.post('/forgot-password', authController.forgotPassword);

// Verify OTP
router.post('/verify-otp', authController.verifyOtp);

// Reset password
router.post('/reset-password', authController.resetPassword);

module.exports = router;
