const express = require('express');
const router = express.Router();
const { register, login, verifyEmail, verifyMobile } = require('../controllers/authController');

router.post('/register', register);
router.post('/login', login);
router.post('/verify-email', verifyEmail);
router.post('/verify-mobile', verifyMobile);

module.exports = router;