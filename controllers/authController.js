const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const User = require('../models/User');
const { JWT_SECRET, EMAIL_USER, EMAIL_PASS } = process.env;

// Register user
exports.register = async (req, res) => {
    const { email, password } = req.body;
    if(!email || !password ) return res.status(400).json({ msg: 'email and password cannot be empty' });

    try {
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ msg: 'User already exists' });
        
        user = new User({ email, password});
        await user.save();
        
        const token = jwt.sign({ id: user._id, role: "user" }, JWT_SECRET, { expiresIn: '5h' });
        res.json({ token, user: { id: user._id, email: user.email, role: "user" } });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Login user
exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: 'User not found' });

        const isMatch = await user.comparePassword(password);
        if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

        const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '5h' });
        res.json({ token, user: { id: user._id, email: user.email, role: user.role } });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Forgot password
exports.forgotPassword = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ msg: 'User not found' });

        // Generate reset token and expiry
        const resetToken = Math.floor(100000 + Math.random() * 900000);  // 6 digit OTP
        user.resetToken = resetToken;
        user.resetTokenExpiry = Date.now() + 3600000; // 1 hour expiry
        await user.save();

        // Send email
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: { user: EMAIL_USER, pass: EMAIL_PASS }
        });

        await transporter.sendMail({
            from: EMAIL_USER,
            to: user.email,
            subject: 'Password Reset',
            text: `Your OTP for password reset is: ${resetToken}`
        });

        res.json({ msg: 'Reset OTP sent to email' });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Reset password
exports.resetPassword = async (req, res) => {
    const { email, otp, newPassword } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user || user.resetToken !== otp || user.resetTokenExpiry < Date.now()) {
            return res.status(400).json({ msg: 'Invalid or expired OTP' });
        }

        user.password = newPassword;
        user.resetToken = undefined;
        user.resetTokenExpiry = undefined;
        await user.save();

        res.json({ msg: 'Password reset successful' });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Logout (Token expiration is automatic in this case)
exports.logout = (req, res) => {
    res.json({ msg: 'Logged out' });
};
