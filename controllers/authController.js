const jwt = require('jsonwebtoken');
const User = require('../models/User');
const sendEmail = require('../utils/emailSender');
const sendSMS = require('../utils/smsService');

const generateToken = (userId) => {
  return jwt.sign({ user: { id: userId } }, processexample.env.JWT_SECRET, { expiresIn: '1h' });
};

exports.register = async (req, res) => {
  try {
    const { name, phone, companyName, companyEmail, employeeSize, password } = req.body;

    let user = await User.findOne({ companyEmail });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    user = new User({
      name,
      phone,
      companyName,
      companyEmail,
      employeeSize,
      password,
      emailVerificationToken: Math.floor(100000 + Math.random() * 900000).toString(),
      mobileVerificationToken: Math.floor(100000 + Math.random() * 900000).toString(),
      tokenExpiration: Date.now() + 3600000, // 1 hour
    });

    await user.save();

    // Send email verification
    await sendEmail(
      user.companyEmail,
      'Email Verification',
      `Your email verification code is: ${user.emailVerificationToken}`
    );

    // Send mobile verification (simulated)
    await sendSMS(
      user.phone,
      `Your mobile verification code is: ${user.mobileVerificationToken}`
    );

    res.status(201).json({ message: 'User registered successfully. Please verify your email and mobile.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ companyEmail: email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    if (!user.isEmailVerified || !user.isMobileVerified) {
      return res.status(400).json({ message: 'Please verify your email and mobile before logging in' });
    }

    const token = generateToken(user.id);
    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.verifyEmail = async (req, res) => {
  try {
    const { email, token } = req.body;

    const user = await User.findOne({ companyEmail: email, emailVerificationToken: token });
    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired token' });
    }

    if (user.tokenExpiration < Date.now()) {
      return res.status(400).json({ message: 'Token has expired' });
    }

    user.isEmailVerified = true;
    user.emailVerificationToken = undefined;
    await user.save();

    res.json({ message: 'Email verified successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.verifyMobile = async (req, res) => {
  try {
    const { phone, token } = req.body;

    const user = await User.findOne({ phone, mobileVerificationToken: token });
    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired token' });
    }

    if (user.tokenExpiration < Date.now()) {
      return res.status(400).json({ message: 'Token has expired' });
    }

    user.isMobileVerified = true;
    user.mobileVerificationToken = undefined;
    await user.save();

    res.json({ message: 'Mobile verified successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};