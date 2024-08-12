require('dotenv').config();
const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Sign Up Route
router.post('/register', async (req, res) => {
    try {
        const { username, password, email, userType } = req.body;

        if (!username || !password || !email || !userType) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, password: hashedPassword, email, userType });
        await user.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ error: 'Registration failed' });
    }
});

// Login Route
router.post('/login', async (req, res) => {
    try {
        const { username, password, adminPassphrase } = req.body;

        if (!username || !password) {
            return res.status(400).json({ error: 'Username and password are required' });
        }

        const user = await User.findOne({ username });

        if (!user) {
            return res.status(401).json({ error: 'Authentication failed - User doesn\'t exist' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ error: 'Authentication failed - Password doesn\'t match' });
        }

        // Check admin passphrase if user is an admin
        if (user.userType === 'admin' && adminPassphrase !== process.env.ADMIN_PASSPHRASE) {
            return res.status(401).json({ error: 'Admin authentication failed - Incorrect passphrase' });
        }

        const token = jwt.sign(
            { userType: user.userType, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.cookie('Authtoken', token);
        res.json({
            status: true,
            message: 'Login successful',
            token,
            userType: user.userType,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Login failed' });
    }
});

router.get('/logout', (req, res) => {
    res.clearCookie('Authtoken');
    res.status(200).send('Logout successful');
});

module.exports = router;
